import React, { useState, useEffect } from "react"
import { Dispatch } from "redux"
import moment from "moment"
import { Redirect, RouteComponentProps } from "react-router-dom"
import { Row, Col, Button, Dropdown, Typography, Space, Spin } from "antd"

import SectionEditLink from "~/Component/Section/CreateEdit/SectionEditLink"
import { DownOutlined, ReadOutlined } from "@ant-design/icons"
import { getSectionById, removeSectionById } from "~/ApiServices/Service/EntityService"
import SectionMenu from "~/Component/Section/SectionMenu"
import styles from "~/Pages/Offering/OfferingDetails.module.scss"
import { connect } from "react-redux"
import { push } from "connected-react-router"

const { Title, Text } = Typography

function SectionDetailsPage(props: RouteComponentProps<{ offeringID: string; sectionID: string }>) {
  console.log(props)
  const sectionID = props?.match?.params?.sectionID
  const offeringID = props?.match?.params?.offeringID
  const [sectionDetails, setSectionDetails] = useState<{ [key: string]: any }>()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [removeApiCallInProgress, setRemoveApiCallInProgress] = useState(false)
  const [redirectAfterRemoveURL, setRedirectAfterRemove] = useState("")

  useEffect(() => {
    ;(async function () {
      setApiCallInProgress(true)
      const result = await getSectionById(Number(sectionID))

      if (result && result.success) {
        setSectionDetails(result.data)
      }
      setApiCallInProgress(false)
    })()
  }, [sectionID])

  return (
    <>
      {apiCallInProgress && (
        <Space size="large" style={{ display: "block", textAlign: "center" }}>
          <Spin size="large" />
        </Space>
      )}
      {sectionDetails && (
        <div className="site-layout-content">
          <Row>
            <Col xs={7} sm={5} md={3}>
              <ReadOutlined className={styles.icon} />
            </Col>
            <Col offset={1} xs={16} sm={18} md={20}>
              <Row>
                <Text className={styles.font20px}>{sectionDetails.SectionNumber}</Text>
              </Row>
              <Row>
                <Text className={styles.font15px}>Name: {sectionDetails.OfferingName}</Text>
              </Row>
              <Row>
                <Text className={styles.font15px}>Organization: {sectionDetails.OrganizationName}</Text>
              </Row>
              <Row>
                <Text className={styles.font15px}>
                  Status: <span style={{ color: "blue" }}>{sectionDetails.StatusCode}</span>
                </Text>
              </Row>
              <Row className={styles.marginTop10px}>
                <Dropdown overlay={<SectionMenu section={sectionDetails} />} trigger={["click"]}>
                  <Button type="primary" onClick={(e) => e.preventDefault()}>
                    Go To <DownOutlined />
                  </Button>
                </Dropdown>
              </Row>
            </Col>
          </Row>
          <Row className={styles.details}>
            <Col span={12}>
              <Title level={3}>Section Details</Title>
            </Col>
            <Col span={12}>
              <SectionEditLink
                SectionID={sectionDetails.SectionID}
                PrimaryType={true}
                style={{ marginRight: "10px" }}
              />
              <Button
                type="primary"
                danger
                loading={removeApiCallInProgress}
                disabled={removeApiCallInProgress}
                onClick={() => {
                  setRemoveApiCallInProgress(true)
                  removeSectionById(Number(sectionID))
                    .then((x) => {
                      if (offeringID) {
                        setRedirectAfterRemove(`/offering/${offeringID}/section`)
                      } else {
                        setRedirectAfterRemove(`/section`)
                      }
                    })
                    .finally(() => {
                      setRemoveApiCallInProgress(false)
                    })
                }}
              >
                Remove
              </Button>
              {redirectAfterRemoveURL !== "" && <Redirect to={redirectAfterRemoveURL} />}
            </Col>
          </Row>

          <Row className={styles.details}>
            <Col span={8}>
              <Text>Description:</Text>
            </Col>
            <Col span={16}>
              <Text>{sectionDetails.Description}</Text>
            </Col>
            <Col span={8}>
              <Text>Offering Type:</Text>
            </Col>
            <Col span={16}>
              <Text>{sectionDetails.OfferingTypeName}</Text>
            </Col>

            <Col span={8}>
              <Text>Creation Date:</Text>
            </Col>
            <Col span={16}>
              <Text>
                {sectionDetails.CreationDate !== null ? moment(sectionDetails.CreationDate).format("YYYY-MM-DD") : ""}
              </Text>
            </Col>
            <Col span={8}>
              <Text>Termination Date:</Text>
            </Col>
            <Col span={16}>
              <Text>
                {sectionDetails.TerminationDate !== null
                  ? moment(sectionDetails.TerminationDate).format("YYYY-MM-DD")
                  : ""}
              </Text>
            </Col>
          </Row>
        </div>
      )}
      {!sectionDetails && !apiCallInProgress && (
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
          Section with ID {sectionID} not found
        </div>
      )}
    </>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return { redirect: (url: string) => dispatch(push(url)) }
}

export default connect(null, mapDispatchToProps)(SectionDetailsPage)
