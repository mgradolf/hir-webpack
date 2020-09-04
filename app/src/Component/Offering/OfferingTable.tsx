import React from "react"
import { Link } from "react-router-dom"
import moment from "moment"
import { Space, Dropdown, Menu, Row, Col } from "antd"
import { DownOutlined } from "@ant-design/icons"
import { ResponsiveTable } from "../ResponsiveTable"

interface IOfferingTableProps {
  dataSource: Array<any>
  loading: boolean
}

export function OfferingTable(props: IOfferingTableProps) {
  function generateMenu(record: any) {
    return (
      <Menu>
        <Menu.Item key="0">
          <Link to={`/offering/${record.OfferingID}/financial`}>Offering Financial</Link>
        </Menu.Item>
        <Menu.Item key="1">
          <Link to={`/offering/${record.OfferingID}/requisite`}>Requisite Management</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to={`/offering/${record.OfferingID}/catalog`}>Catalogs</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to={`/offering/${record.OfferingID}/tag`}>Offering Tag</Link>
        </Menu.Item>
        {record.HasApprovalProcess && (
          <Menu.Item key="4">
            <Link to={`/offering/${record.OfferingID}/approval`}>Offering Approval</Link>
          </Menu.Item>
        )}
        <Menu.Item key="5">
          <Link to={`/offering/${record.OfferingID}/instructor`}>Qualified Instructors</Link>
        </Menu.Item>
      </Menu>
    )
  }

  const columns = [
    {
      title: "Offering Code",
      dataIndex: "OfferingCode",
      key: "OfferingCode",
      render: (text: any, record: any) => <Link to={`/offering/${record.OfferingID}`}>{text}</Link>,
      sorter: (a: any, b: any) => a.OfferingCode.length - b.OfferingCode.length
    },
    {
      title: "Offering Name",
      dataIndex: "OfferingName",
      key: "OfferingName",
      sorter: (a: any, b: any) => a.OfferingName.length - b.OfferingName.length
    },
    {
      title: "Creation Date",
      dataIndex: "CreationDate",
      key: "CreationDate",
      render: (text: any) => (text !== null ? moment(text).format("YYYY-MM-DD") : "")
    },
    {
      title: "Termination Date",
      dataIndex: "TerminationDate",
      key: "TerminationDate",
      render: (text: any) => (text !== null ? moment(text).format("YYYY-MM-DD") : "")
    },
    {
      title: "Status",
      dataIndex: "StatusCode",
      key: "StatusCode",
      sorter: (a: any, b: any) => a.StatusCode.length - b.StatusCode.length
    },
    {
      title: "Department",
      dataIndex: "OrganizationName",
      key: "OrganizationName"
    },
    {
      title: "Offering Type",
      dataIndex: "OfferingTypeName",
      key: "OfferingTypeName"
    },
    {
      title: "Def Section",
      dataIndex: "SectionTypeName",
      key: "SectionTypeName"
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <Dropdown overlay={generateMenu(record)} trigger={["click"]}>
            <a href="/" className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              Others <DownOutlined />
            </a>
          </Dropdown>
        </Space>
      )
    }
  ]

  function expandableRowRender(data: any, display: boolean) {
    return (
      <div style={{ border: "1px solid", padding: "5px" }}>
        <Row>
          <Col span="8">Description:</Col>
          <Col span="16">{data.OfferingDescription}</Col>
        </Row>
        {display && (
          <Row>
            <Col span="8">Creation Date:</Col>
            <Col span="16">{data.CreationDate}</Col>
          </Row>
        )}

        {display && (
          <Row>
            <Col span="8">Termination Date:</Col>
            <Col span="16">{data.TerminationDate}</Col>
          </Row>
        )}

        {display && (
          <Row>
            <Col span="8">Status:</Col>
            <Col span="16">{data.StatusCode}</Col>
          </Row>
        )}

        {display && (
          <Row>
            <Col span="8">Department:</Col>
            <Col span="16">{data.OrganizationName}</Col>
          </Row>
        )}
        {display && (
          <Row>
            <Col span="8">Offering Type:</Col>
            <Col span="16">{data.OfferingTypeName}</Col>
          </Row>
        )}
        {display && (
          <Row>
            <Col span="8">Def Section:</Col>
            <Col span="16">{data.SectionTypeName}</Col>
          </Row>
        )}
      </div>
    )
  }

  return (
    <ResponsiveTable
      columns={columns}
      dataSource={props.dataSource}
      loading={props.loading}
      bordered
      breakpoints={["md", "lg", "xl", "xxl"]}
      responsiveColumnIndices={[2, 3, 4, 5, 6, 7]}
      expandableRowRender={expandableRowRender}
      rowKey="OfferingID"
      pagination={{ position: ["topLeft"] }}
      scroll={{ x: "fit-content" }}
    />
  )
}
