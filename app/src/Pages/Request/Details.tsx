import React, { useState, useEffect } from "react"
import moment from "moment"
import { RouteComponentProps } from "react-router-dom"
import { Row, Col, Typography, Button, Input, Space, Spin, Collapse, DatePicker } from "antd"
import { readRequestForStaff } from "~/ApiServices/Service/RequestService"
import { bulkUpdate, extendExpirationDate } from "~/ApiServices/Service/RequestActivityService"
import { retry, cancel } from "~/ApiServices/Service/RequestModelService"
import { getUserByUserLogin } from "~/ApiServices/Service/HRUserService"
import { getUsername } from "@packages/api/lib/utils/UserInfoStore"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import styles from "~/Pages/Request/RequestDetails.module.scss"
import { RequestDetailsTable } from "~/Component/Section/Request/RequestDetailsTable"
import { RequestActivityTable } from "~/Component/Section/Request/RequestActivityTable"
import ViewResponseModalOpenButton from "~/Component/Section/Request/ViewResponseModalOpenButton"
import { eventBus, EVENT_REQUEST_RESOLUTION } from "~/utils/EventBus"
import { ADMIN_SOURCE_NAME, DATE_TIME_FORMAT, REQUEST_DATE_TIME_FORMAT } from "~/utils/Constants"

const { Title, Text } = Typography
const { Panel } = Collapse

export interface IParamsToBeDispatched {
  ValueUpdate: boolean
  Params: { [key: string]: string }
}

function RequestDetailsPage(props: RouteComponentProps<{ requestID: string }>) {
  const requestID = props.match.params.requestID
  const [showSubmit, setShowSubmit] = useState(true)
  const [userID, setUserID] = useState(String)
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [expirationDateUpdate, setExpirationDateUpdate] = useState(true)
  const [expirationDate, setExpirationDate] = useState(Date)
  const [requestDetails, setRequestDetails] = useState<{ [key: string]: any }>()
  const [processList] = useState<Array<any>>([])
  const [oca, setOca] = useState(Number)

  useEffect(() => {
    ;(async function () {
      const result = await getUserByUserLogin({ UserLogin: getUsername() })

      if (result && result.success) {
        setUserID(result.data["UserID"])
      }
    })()
    ;(async function () {
      setApiCallInProgress(true)
      const result = await readRequestForStaff({ RequestID: Number(requestID), Standalone: true })

      if (result && result.success) {
        setRequestDetails(result.data)
        setOca(result.data.oca)
        console.log("Request oca: ", result.data.oca)
      }
      setApiCallInProgress(false)
    })()

    eventBus.subscribe(EVENT_REQUEST_RESOLUTION, (param: IParamsToBeDispatched) => {
      if (param.ValueUpdate) {
        setShowSubmit(false)
      }

      const params: { [key: string]: any } = param.Params
      params["RequestID"] = Number(requestID)
      params["SourceName"] = ADMIN_SOURCE_NAME
      processList.push(params)
    })
    return () => {
      eventBus.unsubscribe(EVENT_REQUEST_RESOLUTION)
    }
  }, [requestID, processList])

  const expirationDateHandler = (date: any, dateString: any) => {
    if (date === null) {
      setExpirationDateUpdate(true)
    } else {
      setExpirationDate(dateString)
      setExpirationDateUpdate(false)
    }
  }

  const updateAllAction = async () => {
    const params: any = {}
    params["RequestID"] = Number(requestID)
    params["ProcessList"] = processList
    params["oca"] = oca

    console.log("Bulk update params: ", params)

    setApiCallInProgress(true)
    setErrorMessages([])
    const response = await bulkUpdate(params)

    if (response && response.success) {
      setApiCallInProgress(false)
      console.log("Bulk update action done")
      window.location.reload()
    } else {
      setApiCallInProgress(false)
      setErrorMessages(response.error)
      console.log(response.error)
      console.log(errorMessages)
    }
  }

  const updateExpirationDate = async () => {
    const params: any = {}
    params["RequestID"] = Number(requestID)
    params["ExpirationDate"] = expirationDate

    setApiCallInProgress(true)
    setErrorMessages([])
    const response = await extendExpirationDate(params)
    setApiCallInProgress(false)

    if (response && response.success) {
      console.log("Update expiration date success")
      window.location.reload()
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

    setApiCallInProgress(true)
    setErrorMessages([])
    const response = await serviceMethoToCall(params)
    setApiCallInProgress(false)

    if (response && response.success) {
      console.log("Action done success")
      window.location.reload()
    } else {
      setErrorMessages(response.error)
      console.log(response.error)
      console.log(errorMessages)
    }
  }

  return (
    <>
      {apiCallInProgress && (
        <Space size="large" style={{ display: "block", textAlign: "center" }}>
          <Spin size="large" />
        </Space>
      )}
      {requestDetails && (
        <div className="site-layout-content">
          <Row style={{ paddingBottom: "10px" }}>
            <Title level={3}>Request Details</Title>
          </Row>
          <Row className={styles.details}>
            <Col span={2}>
              <Text>Status:</Text>
            </Col>
            <Col span={6}>
              <Input type="text" disabled value={requestDetails.State} />
            </Col>

            <Col span={2} offset={1}>
              <Text>Account:</Text>
            </Col>
            <Col span={6}>
              <Input type="text" disabled value={requestDetails.AccountName} />
            </Col>

            <Col span={7} style={{ textAlign: "right" }}>
              {requestDetails.RetryStatus && (
                <Button type="primary" onClick={() => applyAction("retry")}>
                  Retry
                </Button>
              )}
              {requestDetails.CancelStatus && (
                <Button style={{ marginLeft: "10px" }} type="primary" onClick={() => applyAction("cancel")}>
                  Cancel
                </Button>
              )}
              <ViewResponseModalOpenButton requestJson={requestDetails.RequestJSON} />
            </Col>
          </Row>

          <Row className={styles.details}>
            <Col span={2}>
              <Text>Type:</Text>
            </Col>
            <Col span={6}>
              <Input type="text" disabled value={requestDetails.RequestType} />
            </Col>

            <Col span={2} offset={1}>
              <Text>Purchaser:</Text>
            </Col>
            <Col span={6}>
              <Input type="text" disabled value={requestDetails.PurchaserPersonName} />
            </Col>
          </Row>
          <Row className={styles.details}>
            <Col span={2}>
              <Text>Created:</Text>
            </Col>
            <Col span={6}>
              <Input
                type="text"
                disabled
                value={
                  requestDetails.CreateDate !== null ? moment(requestDetails.CreateDate).format(DATE_TIME_FORMAT) : ""
                }
              />
            </Col>

            <Col span={2} offset={1}>
              <Text>Source:</Text>
            </Col>
            <Col span={6}>
              <Input type="text" disabled value={requestDetails.Source} />
            </Col>
          </Row>
          <Row className={styles.details}>
            <Col span={2}>
              <Text>Expires:</Text>
            </Col>
            <Col span={6}>
              <DatePicker
                aria-label="Pick Expiration Date"
                placeholder={DATE_TIME_FORMAT}
                format={DATE_TIME_FORMAT}
                onChange={expirationDateHandler}
                defaultValue={
                  requestDetails.ExpirationDate
                    ? moment(requestDetails.ExpirationDate, REQUEST_DATE_TIME_FORMAT)
                    : undefined
                }
              />
            </Col>

            <Col span={6} offset={1}>
              <Button disabled={expirationDateUpdate} onClick={updateExpirationDate} type="primary">
                Update
              </Button>
            </Col>
          </Row>

          <Row>
            <Col xs={24} className={styles.textRight}>
              <Button type="primary" disabled={showSubmit} onClick={updateAllAction}>
                Save All Updates
              </Button>
            </Col>
          </Row>
          <Collapse defaultActiveKey={["1"]} accordion className={styles.marginTop10px}>
            <Panel header="Request" key="1">
              <RequestDetailsTable dataSource={requestDetails} loading={false} />
            </Panel>
            <Panel header="Request Activity" key="2">
              <RequestActivityTable dataSource={requestDetails.ActivityLogs.ActivityLogs} loading={false} />
            </Panel>
          </Collapse>
        </div>
      )}
      {!requestDetails && !apiCallInProgress && (
        <div
          style={{
            textAlign: "center",
            margin: "auto",
            fontSize: "2em",
            opacity: 0.5,
            marginTop: "30vh",
            width: "50%"
          }}
        >
          Request with ID {requestID} not found
        </div>
      )}
    </>
  )
}
export default RequestDetailsPage
