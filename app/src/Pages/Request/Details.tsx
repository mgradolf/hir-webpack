import React, { useState, useEffect } from "react"
import moment from "moment"
import { RouteComponentProps } from "react-router-dom"
import { Row, Col, Typography, Button, Input, Space, Spin } from "antd"
import { readRequestForStaff } from "~/ApiServices/Service/RequestService"
import styles from "~/Pages/Request/RequestDetails.module.scss"
import { RequestDetailsTable } from "~/Component/Section/Request/RequestDetailsTable"

const { Title, Text } = Typography

function RequestDetailsPage(props: RouteComponentProps<{ requestID: string }>) {
  const requestID = props.match.params.requestID
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [requestDetails, setRequestDetails] = useState<{ [key: string]: any }>()

  useEffect(() => {
    ;(async function () {
      setApiCallInProgress(true)
      const result = await readRequestForStaff({ RequestID: Number(requestID), Standalone: true })

      if (result && result.success) {
        setRequestDetails(result.data)
      }
      setApiCallInProgress(false)
    })()
  }, [requestID])

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
            <Col span={3}>
              <Text>Status:</Text>
            </Col>
            <Col span={8}>
              <Input type="text" disabled value={requestDetails.State} />
            </Col>
            <Col span={12} offset={1}>
              {requestDetails.RetryStatus && <Button type="primary">Retry</Button>}
              {requestDetails.CancelStatus && (
                <Button style={{ marginLeft: "10px" }} type="primary">
                  Cancel
                </Button>
              )}
              <Button style={{ marginLeft: "10px" }} type="primary">
                View Response
              </Button>
            </Col>
          </Row>
          <Row className={styles.details}>
            <Col span={3}>
              <Text>Account:</Text>
            </Col>
            <Col span={8}>
              <Input type="text" disabled value={requestDetails.AccountName} />
            </Col>
          </Row>
          <Row className={styles.details}>
            <Col span={3}>
              <Text>Purchaser:</Text>
            </Col>
            <Col span={8}>
              <Input type="text" disabled value={requestDetails.PurchaserPersonName} />
            </Col>
          </Row>
          <Row className={styles.details}>
            <Col span={3}>
              <Text>Type:</Text>
            </Col>
            <Col span={8}>
              <Input type="text" disabled value={requestDetails.RequestType} />
            </Col>
          </Row>
          <Row className={styles.details}>
            <Col span={3}>
              <Text>Created:</Text>
            </Col>
            <Col span={8}>
              <Input
                type="text"
                disabled
                value={
                  requestDetails.CreateDate !== null
                    ? moment(requestDetails.CreateDate).format("DD/MM/YYYY hh:mm A")
                    : ""
                }
              />
            </Col>
          </Row>
          <Row className={styles.details}>
            <Col span={3}>
              <Text>Source:</Text>
            </Col>
            <Col span={8}>
              <Input type="text" disabled value={requestDetails.Source} />
            </Col>
          </Row>
          <Row className={styles.details}>
            <Col span={3}>
              <Text>Expires:</Text>
            </Col>
            <Col span={8}>
              <Input
                type="text"
                disabled
                value={
                  requestDetails.ExpirationDate !== null
                    ? moment(requestDetails.ExpirationDate).format("DD/MM/YYYY hh:mm A")
                    : ""
                }
              />
            </Col>
          </Row>

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={`${styles.paddingTop10px}  ${styles.margin0px}`}>
            <Col className={`gutter-row ${styles.requestDetails}`} xs={24} sm={24} md={{ span: 24, offset: 0 }}>
              <RequestDetailsTable dataSource={requestDetails.Tasks.Tasks} loading={false} />
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
