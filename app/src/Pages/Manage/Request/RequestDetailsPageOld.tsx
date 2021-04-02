import React, { useState, useEffect } from "react"
import moment from "moment"
import { RouteComponentProps } from "react-router-dom"
import { Row, Col, Typography, Button, Input, Space, Spin, DatePicker, Tabs } from "antd"
import { readRequestForStaff } from "~/ApiServices/Service/RequestService"
import { bulkUpdate, extendExpirationDate, makeExternalPayment } from "~/ApiServices/Service/RequestActivityService"
import { retry, cancel } from "~/ApiServices/Service/RequestModelService"
import { getUserByUserLogin } from "~/ApiServices/Service/HRUserService"
import { getUsername } from "@packages/api/lib/utils/UserInfoStore"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import styles from "~/Pages/Manage/Request/RequestDetails.module.scss"
import RequestDetailsTable from "~/Component/Feature/Section/Request/RequestActionsTable"
import { RequestActivityTable } from "~/Component/Feature/Section/Request/RequestActivityTable"
import ViewResponseModalOpenButton from "~/Component/Feature/Section/Request/ViewResponseModalOpenButton"
import { eventBus, EVENT_REQUEST_RESOLUTION, EVENT_REQUEST_RETRY, EVENT_REQUEST_MAKE_PAYMENT } from "~/utils/EventBus"
import {
  ACTION_REQUIRED_REQUEST_STATE_ID,
  ADMIN_SOURCE_NAME,
  DATE_TIME_FORMAT,
  REQUEST_DATE_TIME_FORMAT
} from "~/utils/Constants"

const { Title, Text } = Typography
const { TabPane } = Tabs

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
  }, [requestID])

  useEffect(() => {
    const makePaymentAction = async () => {
      const requestData = requestDetails !== undefined ? requestDetails.ContextData.RequestData : {}

      const params: any = {}
      params["RequestID"] = Number(requestID)
      params["PaymentGatewayAccountID"] = requestData.Allocation[0].PaymentGatewayAccountID

      setApiCallInProgress(true)
      setErrorMessages([])
      const response = await makeExternalPayment(params)
      setApiCallInProgress(false)
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
  }, [requestID, processList, requestDetails])

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
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ paddingBottom: "15px" }}>
            <Col className="gutter-row" xs={24} sm={24} md={12}>
              <Title level={3}>Request Details</Title>
            </Col>
            <Col className={`gutter-row ${styles.textRight}`} xs={24} sm={24} md={12}>
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
            <Col xs={8} sm={7} md={2}>
              <Text>Status:</Text>
            </Col>
            <Col xs={16} sm={17} md={6}>
              <Input type="text" disabled value={requestDetails.State} />
            </Col>

            <Col xs={8} sm={7} md={{ span: 2, offset: 1 }}>
              <Text>Account:</Text>
            </Col>
            <Col xs={16} sm={17} md={6}>
              <Input type="text" disabled value={requestDetails.AccountName} />
            </Col>
          </Row>

          <Row className={styles.details}>
            <Col xs={8} sm={7} md={2}>
              <Text>Type:</Text>
            </Col>
            <Col xs={16} sm={17} md={6}>
              <Input type="text" disabled value={requestDetails.RequestType} />
            </Col>

            <Col xs={8} sm={7} md={{ span: 2, offset: 1 }}>
              <Text>Purchaser:</Text>
            </Col>
            <Col xs={16} sm={17} md={6}>
              <Input type="text" disabled value={requestDetails.PurchaserPersonName} />
            </Col>
          </Row>
          <Row className={styles.details}>
            <Col xs={8} sm={7} md={2}>
              <Text>Created:</Text>
            </Col>
            <Col xs={16} sm={17} md={6}>
              <Input
                type="text"
                disabled
                value={
                  requestDetails.CreateDate !== null ? moment(requestDetails.CreateDate).format(DATE_TIME_FORMAT) : ""
                }
              />
            </Col>

            <Col xs={8} sm={7} md={{ span: 2, offset: 1 }}>
              <Text>Source:</Text>
            </Col>
            <Col xs={16} sm={17} md={6}>
              <Input type="text" disabled value={requestDetails.Source} />
            </Col>
          </Row>
          <Row className={styles.details}>
            <Col xs={8} sm={7} md={2}>
              <Text>Expires:</Text>
            </Col>
            <Col xs={16} sm={17} md={6}>
              <DatePicker
                disabled={requestDetails.StateID !== ACTION_REQUIRED_REQUEST_STATE_ID}
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

            <Col xs={24} sm={24} md={{ span: 6, offset: 1 }}>
              <Button disabled={expirationDateUpdate} onClick={updateExpirationDate} type="primary">
                Update
              </Button>
            </Col>
          </Row>

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={`${styles.paddingTop10px}  ${styles.margin0px}`}>
            <Col className={`gutter-row ${styles.requestDetails}`} xs={24} sm={24} md={24}>
              <Tabs type="card">
                <TabPane tab="Request" key="1">
                  <Button
                    type="primary"
                    style={{ float: "right", zIndex: 11, marginTop: "16px" }}
                    disabled={showSubmit}
                    onClick={updateAllAction}
                  >
                    Save All Updates
                  </Button>
                  <RequestDetailsTable dataSource={requestDetails} loading={false} />
                </TabPane>
                <TabPane tab="Request Activity" key="2">
                  <RequestActivityTable dataSource={requestDetails.ActivityLogs.ActivityLogs} loading={false} />
                </TabPane>
              </Tabs>
            </Col>
          </Row>
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
