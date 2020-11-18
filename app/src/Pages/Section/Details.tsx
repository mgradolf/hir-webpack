import React, { useState, useEffect } from "react"
import { Dispatch } from "redux"
import apiErroreEventBus from "@packages/api/lib/utils/GlobalHttpErrorEventBus"
import { Redirect, RouteComponentProps } from "react-router-dom"
import { Row, Col, Button, Typography, Space, Spin } from "antd"
import SectionEditLink from "~/Component/Section/CreateEdit/SectionEditLink"
import SectionCopyModalOpenButton from "~/Component/Section/Copy/SectionCopyModalOpenButton"
import { ReadOutlined } from "@ant-design/icons"
import { getSectionById, removeSectionById } from "~/ApiServices/Service/EntityService"
import SectionMenu from "~/Component/Section/SectionMenu"
import styles from "~/Pages/Offering/OfferingDetails.module.scss"
import { connect } from "react-redux"
import { push } from "connected-react-router"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"

const { Title, Text } = Typography

function SectionDetailsPage(props: RouteComponentProps<{ offeringID: string; sectionID: string }>) {
  const sectionID = props?.match?.params?.sectionID
  const offeringID = props?.match?.params?.offeringID
  const [sectionDetails, setSectionDetails] = useState<{ [key: string]: any }>()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [removeApiCallInProgress, setRemoveApiCallInProgress] = useState(false)
  const [redirectAfterRemoveURL, setRedirectAfterRemove] = useState("")

  useEffect(() => {
    const loadSection = async function () {
      setApiCallInProgress(true)
      const result = await getSectionById(Number(sectionID))

      if (result && result.success) {
        setSectionDetails(result.data)
      }
      setApiCallInProgress(false)
    }

    eventBus.subscribe(REFRESH_PAGE, loadSection)
    eventBus.publish(REFRESH_PAGE)
    return () => eventBus.unsubscribe(REFRESH_PAGE)
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
              <Row className={styles.marginTop10px}>
                <SectionMenu section={sectionDetails} />
              </Row>
            </Col>
          </Row>
          <Row className={styles.details}>
            <Col span={12}>
              <Title level={3}>Section Actions</Title>
            </Col>
            <Col span={12}>
              <SectionEditLink
                OfferingID={sectionDetails.OfferingID}
                SectionID={sectionDetails.SectionID}
                PrimaryType={true}
                style={{ marginRight: "10px" }}
              />
              <Button
                type="primary"
                danger
                loading={removeApiCallInProgress}
                disabled={removeApiCallInProgress}
                style={{ marginRight: "10px" }}
                onClick={() => {
                  setRemoveApiCallInProgress(true)
                  removeSectionById(Number(sectionID))
                    .then((x) => {
                      if (x.success) {
                        apiErroreEventBus.publish([{ message: `Section ${sectionDetails.SectionNumber} removed` }])
                        if (offeringID) {
                          setRedirectAfterRemove(`/offering/${offeringID}/section`)
                        } else {
                          setRedirectAfterRemove(`/section`)
                        }
                      }
                    })
                    .finally(() => {
                      setRemoveApiCallInProgress(false)
                    })
                }}
              >
                Remove
              </Button>
              <SectionCopyModalOpenButton
                SectionID={sectionDetails.SectionID}
                SectionNumber={sectionDetails.SectionNumber}
              />
              {redirectAfterRemoveURL !== "" && <Redirect to={redirectAfterRemoveURL} />}
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
