import React, { useState, useEffect } from "react"

import moment from "moment"
import { RouteComponentProps, Link } from "react-router-dom"
import { Menu, Row, Col, Button, Dropdown, Typography } from "antd"

import OfferingEditLink from "~/component/Offering/CreateEdit/OfferingEditLink"
import { DownOutlined, ReadOutlined } from "@ant-design/icons"
import { searchOffering } from "~/ApiServices/Service/OfferingService"
import styles from "~/pages/Offering/OfferingDetails.module.scss"

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
  const [offeringDetails, setOfferingDetails] = useState<Array<any>>([])

  useEffect(() => {
    ;(async function () {
      const result = await searchOffering({ OfferingID: Number(offeringID) })

      if (result && result.success) {
        setOfferingDetails(result.data)
      }
    })()
  }, [offeringID])

  return (
    <>
      {offeringDetails.length &&
        offeringDetails.map((offering) => {
          return (
            <div className="site-layout-content">
              <Row>
                <Col span={3}>
                  <ReadOutlined style={{ fontSize: "160px" }} />
                </Col>
                <Col span={13} style={{ padding: "10px" }}>
                  <Row>
                    <Text style={{ fontSize: "20px" }}>{offering.OfferingCode}</Text>
                  </Row>
                  <Row>
                    <Text style={{ fontSize: "15px" }}>Name: {offering.OfferingName}</Text>
                  </Row>
                  <Row>
                    <Text style={{ fontSize: "15px" }}>Organization: {offering.OrganizationName}</Text>
                  </Row>
                  <Row>
                    <Text style={{ fontSize: "15px" }}>
                      Status: <span style={{ color: "blue" }}>{offering.StatusCode}</span>
                    </Text>
                  </Row>
                  <Row style={{ marginTop: "10px" }}>
                    <Dropdown overlay={generateMenu(offering)} trigger={["click"]}>
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
                    <OfferingEditLink OfferingId={offering.OfferingID} PrimaryType={true} />
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
                    <Text>{offering.OfferingDescription}</Text>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    <Text>Offering Type:</Text>
                  </Col>
                  <Col span={6}>
                    <Text>{offering.OfferingTypeName}</Text>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    <Text>Creation Date:</Text>
                  </Col>
                  <Col span={6}>
                    <Text>
                      {offering.CreationDate !== null ? moment(offering.CreationDate).format("YYYY-MM-DD") : ""}
                    </Text>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    <Text>Termination Date:</Text>
                  </Col>
                  <Col span={6}>
                    <Text>
                      {offering.TerminationDate !== null ? moment(offering.TerminationDate).format("YYYY-MM-DD") : ""}
                    </Text>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    <Text>Default Section:</Text>
                  </Col>
                  <Col span={6}>
                    <Text>{offering.SectionTypeName}</Text>
                  </Col>
                </Row>
              </div>
            </div>
          )
        })}
    </>
  )
}
export default OfferingDetailsPage
