import React, { useState, useEffect } from "react"

import moment from "moment"
import { RouteComponentProps } from "react-router-dom"
import { Row, Col, Button, Dropdown, Typography } from "antd"

import OfferingEditLink from "~/Component/Offering/CreateEdit/OfferingEditLink"
import { DownOutlined, ReadOutlined } from "@ant-design/icons"
import { searchOffering } from "~/ApiServices/Service/OfferingService"
import OfferingMenu from "~/Component/Offering/OfferingMenu"

const { Title, Text } = Typography

function OfferingDetailsPage(props: RouteComponentProps<{ id: string }>) {
  const offeringID = props.match.params.id
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
            <Col span={3}>
              <ReadOutlined style={{ fontSize: "160px" }} />
            </Col>
            <Col span={13} style={{ padding: "10px" }}>
              <Row>
                <Text style={{ fontSize: "20px" }}>{offeringDetails.OfferingCode}</Text>
              </Row>
              <Row>
                <Text style={{ fontSize: "15px" }}>Name: {offeringDetails.OfferingName}</Text>
              </Row>
              <Row>
                <Text style={{ fontSize: "15px" }}>Organization: {offeringDetails.OrganizationName}</Text>
              </Row>
              <Row>
                <Text style={{ fontSize: "15px" }}>
                  Status: <span style={{ color: "blue" }}>{offeringDetails.StatusCode}</span>
                </Text>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Dropdown overlay={<OfferingMenu offering={offeringDetails} />} trigger={["click"]}>
                  <Button type="primary" onClick={(e) => e.preventDefault()}>
                    Go To <DownOutlined />
                  </Button>
                </Dropdown>
              </Row>
            </Col>
          </Row>

          <div
            style={{
              background: "white",
              padding: "20px",
              marginTop: "40px",
              marginLeft: "225px",
              marginRight: "50px"
            }}
          >
            <Row>
              <Col span={12}>
                <Title level={3}>Offering Details</Title>
              </Col>
              <Col span={12}>
                <OfferingEditLink OfferingId={offeringDetails.OfferingID} PrimaryType={true} />
              </Col>
            </Row>
          </div>
          <div
            style={{
              background: "white",
              padding: "40px",
              marginTop: "10px",
              marginLeft: "225px",
              marginRight: "50px"
            }}
          >
            <Row>
              <Col span={6}>
                <Text>Description:</Text>
              </Col>
              <Col span={6}>
                <Text>{offeringDetails.OfferingDescription}</Text>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <Text>Offering Type:</Text>
              </Col>
              <Col span={6}>
                <Text>{offeringDetails.OfferingTypeName}</Text>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <Text>Creation Date:</Text>
              </Col>
              <Col span={6}>
                <Text>
                  {!!offeringDetails.CreationDate ? moment(offeringDetails.CreationDate).format("YYYY-MM-DD") : ""}
                </Text>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <Text>Termination Date:</Text>
              </Col>
              <Col span={6}>
                <Text>
                  {!!offeringDetails.TerminationDate
                    ? moment(offeringDetails.TerminationDate).format("YYYY-MM-DD")
                    : ""}
                </Text>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <Text>Default Section:</Text>
              </Col>
              <Col span={6}>
                <Text>{offeringDetails.SectionTypeName}</Text>
              </Col>
            </Row>
          </div>
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
