import React, { useState, useEffect } from "react"

import moment from "moment"
import { RouteComponentProps } from "react-router-dom"
import { Row, Col, Button, Dropdown, Typography } from "antd"

import OfferingEditLink from "~/Component/Offering/CreateEdit/OfferingEditLink"
import { DownOutlined, ReadOutlined } from "@ant-design/icons"
import { searchOffering } from "~/ApiServices/Service/OfferingService"
import OfferingMenu from "~/Component/Offering/OfferingMenu"
import styles from "~/Pages/Offering/OfferingDetails.module.scss"

const { Title, Text } = Typography

function OfferingDetailsPage(props: RouteComponentProps<{ offeringID: string }>) {
  const offeringID = props.match.params.offeringID
  const [offeringDetails, setOfferingDetails] = useState<{ [key: string]: any }>()

  useEffect(() => {
    ;(async function () {
      const result = await searchOffering({ OfferingID: Number(offeringID) })

      if (result && result.success && Array.isArray(result.data) && result.data.length > 0) {
        setOfferingDetails(result.data[0])
      }
    })()
  }, [offeringID])

  return (
    <>
      {offeringDetails && (
        <div className="site-layout-content">
          <Row>
            <Col xs={7} sm={5} md={3}>
              <ReadOutlined className={styles.icon} />
            </Col>
            <Col offset={1} xs={16} sm={18} md={20}>
              <Row>
                <Text className={styles.font20px}>{offeringDetails.OfferingCode}</Text>
              </Row>
              <Row>
                <Text className={styles.font15px}>Name: {offeringDetails.OfferingName}</Text>
              </Row>
              <Row>
                <Text className={styles.font15px}>Organization: {offeringDetails.OrganizationName}</Text>
              </Row>
              <Row>
                <Text className={styles.font15px}>
                  Status: <span style={{ color: "blue" }}>{offeringDetails.StatusCode}</span>
                </Text>
              </Row>
              <Row className={styles.marginTop10px}>
                <Dropdown overlay={<OfferingMenu offering={offeringDetails} />} trigger={["click"]}>
                  <Button type="primary" onClick={(e) => e.preventDefault()}>
                    Go To <DownOutlined />
                  </Button>
                </Dropdown>
              </Row>
            </Col>
          </Row>
          <Row className={styles.details}>
            <Col span={12}>
              <Title level={3}>Offering Details</Title>
            </Col>
            <Col span={12}>
              <OfferingEditLink OfferingId={offeringDetails.OfferingID} PrimaryType={true} />
            </Col>
          </Row>

          <Row className={styles.details}>
            <Col span={8}>
              <Text>Description:</Text>
            </Col>
            <Col span={16}>
              <Text>{offeringDetails.OfferingDescription}</Text>
            </Col>
            <Col span={8}>
              <Text>Offering Type:</Text>
            </Col>
            <Col span={16}>
              <Text>{offeringDetails.OfferingTypeName}</Text>
            </Col>

            <Col span={8}>
              <Text>Creation Date:</Text>
            </Col>
            <Col span={16}>
              <Text>
                {offeringDetails.CreationDate !== null ? moment(offeringDetails.CreationDate).format("YYYY-MM-DD") : ""}
              </Text>
            </Col>
            <Col span={8}>
              <Text>Termination Date:</Text>
            </Col>
            <Col span={16}>
              <Text>
                {offeringDetails.TerminationDate !== null
                  ? moment(offeringDetails.TerminationDate).format("YYYY-MM-DD")
                  : ""}
              </Text>
            </Col>
            <Col span={8}>
              <Text>Default Section:</Text>
            </Col>
            <Col span={16}>
              <Text>{offeringDetails.SectionTypeName}</Text>
            </Col>
          </Row>
        </div>
      )}
      {!offeringDetails && (
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
          Offering with ID {offeringID} not found
        </div>
      )}
    </>
  )
}
export default OfferingDetailsPage
