import React, { useState, useEffect } from "react"
import { Space, Button, Dropdown } from "antd"
import { ResponsiveTable, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { bulkUpdate, makeExternalPayment } from "~/ApiServices/Service/RequestActivityService"
import { retry, cancel } from "~/ApiServices/Service/RequestModelService"
import { getUserByUserLogin } from "~/ApiServices/Service/HRUserService"
import { getUsername } from "@packages/api/lib/utils/UserInfoStore"
import RequestDetailsMenu from "~/Component/Section/Request/RequestDetailsMenu"
import {
  PROCESSED_REQUEST_STATE_ID,
  ERROR_REQUEST_STATE_ID,
  ACTION_REQUIRED_REQUEST_STATE_ID,
  REQUEST_TASK_TYPE_NAME,
  ADMIN_SOURCE_NAME
} from "~/utils/Constants"
import { DownOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { REFRESH_PAGE, REFRESH_REQUEST_ACTION_TAB } from "~/utils/EventBus"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { eventBus, EVENT_REQUEST_RESOLUTION, EVENT_REQUEST_RETRY, EVENT_REQUEST_MAKE_PAYMENT } from "~/utils/EventBus"
import { IParamsToBeDispatched } from "~/Pages/Manage/Request/RequestDetailsPage"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export interface ITableWrapperProps {
  dataSource: any
  loading: boolean
}

export default function RequestActionsTable(props: ITableWrapperProps) {
  const requestData = props.dataSource.ContextData.RequestData
  const requestID = props.dataSource.RequestID
  const oca = props.dataSource.oca

  const [showSubmit, setShowSubmit] = useState(true)
  const [userID, setUserID] = useState(String)
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [processList] = useState<Array<any>>([])

  useEffect(() => {
    ;(async function () {
      const result = await getUserByUserLogin({ UserLogin: getUsername() })

      if (result && result.success) {
        setUserID(result.data["UserID"])
      }
    })()
  }, [])

  useEffect(() => {
    const makePaymentAction = async () => {
      const params: any = {}
      params["RequestID"] = Number(requestID)
      params["PaymentGatewayAccountID"] = requestData.Allocation[0].PaymentGatewayAccountID

      setErrorMessages([])
      const response = await makeExternalPayment(params)
      if (response && response.success) {
        console.log("Make payment action done success")
        window.open(response.data.URL)
      } else {
        setErrorMessages(response.error)
        console.log(response.error)
        console.log(errorMessages)
      }
    }

    eventBus.subscribe(EVENT_REQUEST_RESOLUTION, (param: IParamsToBeDispatched) => {
      if (param.ValueUpdate) {
        setShowSubmit(false)
      }

      const params: { [key: string]: any } = param.Params
      params["RequestID"] = Number(requestID)
      params["SourceName"] = ADMIN_SOURCE_NAME
      processList.push(params)
    })

    eventBus.subscribe(EVENT_REQUEST_RETRY, () => applyAction("retry"))
    eventBus.subscribe(EVENT_REQUEST_MAKE_PAYMENT, makePaymentAction)
    return () => {
      eventBus.unsubscribe(EVENT_REQUEST_RESOLUTION)
      eventBus.unsubscribe(EVENT_REQUEST_RETRY)
      eventBus.unsubscribe(EVENT_REQUEST_MAKE_PAYMENT)
    }
    // eslint-disable-next-line
  }, [requestID, processList, requestData])

  const updateAllAction = async () => {
    const params: any = {}
    params["RequestID"] = Number(requestID)
    params["ProcessList"] = processList
    params["oca"] = oca

    console.log("Bulk update params: ", params)

    setErrorMessages([])
    const response = await bulkUpdate(params)

    if (response && response.success) {
      console.log("Bulk update action done")
      eventBus.publish(REFRESH_PAGE)
    } else {
      setErrorMessages(response.error)
      console.log(response.error)
      console.log(errorMessages)
    }
  }

  const applyAction = async (actionName: string) => {
    const params: any = {}
    params["RequestID"] = Number(requestID)
    params["Source"] = ADMIN_SOURCE_NAME
    params["ActivityBy"] = userID

    const serviceMethoToCall: (params: { [key: string]: any }) => Promise<IApiResponse> =
      actionName === "retry" ? retry : cancel

    setErrorMessages([])
    const response = await serviceMethoToCall(params)
    if (response && response.success) {
      console.log("Action done success")
      eventBus.publish(REFRESH_PAGE)
    } else {
      setErrorMessages(response.error)
      console.log(response.error)
      console.log(errorMessages)
    }
  }

  const extraDataSource = {
    AccountID: props.dataSource.AccountID,
    PaymentTypeName: requestData.PaymentTypeName,
    PaymentTypeID: requestData.PaymentTypeID,
    PaymentAmount: requestData.TotalPaymentAmount,
    PaymentGatewayAccountID: requestData.Allocation[0].PaymentGatewayAccountID
  }

  const columns: TableColumnType = [
    {
      title: "Processing",
      dataIndex: "TaskType",
      key: "TaskType"
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description"
    },
    {
      title: "Recipient",
      dataIndex: "RecipientPersonName",
      key: "RecipientPersonName"
    },
    {
      title: "Issues",
      dataIndex: "Issues",
      key: "Issues",
      render: (issues: any) => (issues != null ? issues.length : 0)
    },
    {
      title: "Status",
      key: "State",
      render: (record: any) =>
        record.Issues !== null && record.Issues.length > 0 ? record.Issues[0].Description : record.State
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          {record.StateID === PROCESSED_REQUEST_STATE_ID && record.TaskType === REQUEST_TASK_TYPE_NAME.ORDER && (
            <Link to={`/order/${record.ProcessResult.OrderID}`}>View Records</Link>
          )}
          {record.StateID === PROCESSED_REQUEST_STATE_ID && record.TaskType === REQUEST_TASK_TYPE_NAME.REGISTRATION && (
            <Link to={`/section/${record.TaskData.SectionID}/registration`}>View Records</Link>
          )}
          {record.StateID === PROCESSED_REQUEST_STATE_ID &&
            record.TaskType === REQUEST_TASK_TYPE_NAME.EXTERNAL_GATEWAY_PAYMENT && (
              <Link to={`/order/payments/${record.ProcessResult.PaymentID}`}>View Records</Link>
            )}
          {record.StateID === PROCESSED_REQUEST_STATE_ID &&
            record.TaskType === REQUEST_TASK_TYPE_NAME.PURCHASE_ORDER && (
              <Link to={`/order/${record.ProcessResult.PurchaseOrderID}`}>View Records</Link>
            )}
          {(record.StateID === ACTION_REQUIRED_REQUEST_STATE_ID || record.StateID === ERROR_REQUEST_STATE_ID) &&
            record.Issues.length > 0 &&
            record.UpdatedResponse === undefined && (
              <Dropdown
                overlay={<RequestDetailsMenu taskJson={record} extraDataSource={extraDataSource} />}
                trigger={["click"]}
              >
                <Button type="link" onClick={(e) => e.preventDefault()}>
                  Actions <DownOutlined />
                </Button>
              </Dropdown>
            )}
        </Space>
      )
    }
  ]

  return (
    <>
      <Button
        type="primary"
        style={{ float: "right", zIndex: 11, marginTop: "16px" }}
        disabled={showSubmit}
        onClick={updateAllAction}
      >
        Save All Updates
      </Button>
      <ResponsiveTable
        columns={columns}
        dataSource={props.dataSource.Tasks.Tasks}
        refreshEventName={REFRESH_REQUEST_ACTION_TAB}
      />
    </>
  )
}
