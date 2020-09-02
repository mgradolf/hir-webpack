import React, { useState, useEffect } from "react"

import moment from "moment"
import { RouteComponentProps, Link } from "react-router-dom"
import { Menu, Row, Col, Button, Dropdown, Typography } from "antd"

import OfferingEditLink from "~/Component/Offering/CreateEdit/OfferingEditLink"
import { DownOutlined, ReadOutlined } from "@ant-design/icons"
import { searchOffering } from "~/ApiServices/Service/OfferingService"

const { Title, Text } = Typography

function generateMenu(record: any) {
  return (
    <Menu>
      <Menu.Item key="0">
        <Link to={`/offering/${record.OfferingID}/financial`}>Offering Financial</Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to={"/"}>Requisite Management</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to={`/offering/${record.OfferingID}/catalog`}>Catalogs</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to={"/"}>Offering Tag</Link>
      </Menu.Item>
      {record.HasApprovalProcess && (
        <Menu.Item key="4">
          <Link to={`/offering/${record.OfferingID}/approval`}>Offering Approval</Link>
        </Menu.Item>
      )}
      <Menu.Item key="5">
        <Link to={"/"}>Qualified Instructors</Link>
      </Menu.Item>
    </Menu>
  )
}

function OfferingDetailsPage(props: RouteComponentProps<{ id: string }>) {
  const offeringID = props.match.params.id
  const [offeringDetails, setOfferingDetails] = useState<{ [key: string]: any }>({})

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
                <Dropdown overlay={generateMenu(offeringDetails)} trigger={["click"]}>
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
                  {offeringDetails.CreationDate !== null
                    ? moment(offeringDetails.CreationDate).format("YYYY-MM-DD")
                    : ""}
                </Text>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <Text>Termination Date:</Text>
              </Col>
              <Col span={6}>
                <Text>
                  {offeringDetails.TerminationDate !== null
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
    </>
  )
}
export default OfferingDetailsPage
