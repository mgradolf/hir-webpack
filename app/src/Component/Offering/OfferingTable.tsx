import React from "react"
import { Link } from "react-router-dom"
import moment from "moment"
import { Space, Dropdown, Row, Col } from "antd"
import { DownOutlined } from "@ant-design/icons"
import ResponsiveTable, { RecordType } from "~/Component/Common/ResponsiveTable"
import OfferingMenu from "~/Component/Offering/OfferingMenu"
import { ColumnsType } from "antd/lib/table"

export interface ITableWrapperProps {
  dataSource: Array<any>
  loading: boolean
  isModal?: boolean
  rowSelection?: any
}

export function OfferingTable(props: ITableWrapperProps) {
  const columns: ColumnsType<RecordType> = [
    {
      title: "Offering Code",
      dataIndex: "OfferingCode",
      key: "OfferingCode",
      render: (text: any, record: any) =>
        props.isModal ? text : <Link to={`/offering/${record.OfferingID}`}>{text}</Link>,
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
      title: "Offering Type",
      dataIndex: "OfferingTypeName",
      key: "OfferingTypeName"
    }
  ]

  if (!props.isModal) {
    columns.push({
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <Dropdown overlay={<OfferingMenu offering={record} />} trigger={["click"]}>
            <a href="/" className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              Others <DownOutlined />
            </a>
          </Dropdown>
        </Space>
      )
    })
  }

  function expandableRowRender(data: any, mobileView: boolean) {
    return (
      <div style={{ border: "1px solid", padding: "5px" }}>
        <Row>
          <Col span="10">Description:</Col>
          <Col span="14">{data.OfferingDescription}</Col>
        </Row>
        {mobileView && (
          <Row>
            <Col span="10">Offering Name:</Col>
            <Col span="14">{data.OfferingName}</Col>
          </Row>
        )}
        <Row>
          <Col span="10">Department:</Col>
          <Col span="14">{data.OrganizationName}</Col>
        </Row>
        <Row>
          <Col span="10">Def Section:</Col>
          <Col span="14">{data.SectionTypeName}</Col>
        </Row>
        {mobileView && (
          <Row>
            <Col span="10">Creation Date:</Col>
            <Col span="14">{data.CreationDate ? moment(data.CreationDate).format("YYYY-MM-DD") : ""}</Col>
          </Row>
        )}
        {mobileView && (
          <Row>
            <Col span="10">Termination Date:</Col>
            <Col span="14">{data.TerminationDate ? moment(data.TerminationDate).format("YYYY-MM-DD") : ""}</Col>
          </Row>
        )}
        {mobileView && (
          <Row>
            <Col span="10">Status:</Col>
            <Col span="14">{data.StatusCode}</Col>
          </Row>
        )}
        {mobileView && (
          <Row>
            <Col span="10">Department:</Col>
            <Col span="14">{data.OrganizationName}</Col>
          </Row>
        )}
        {mobileView && (
          <Row>
            <Col span="10">Offering Type:</Col>
            <Col span="14">{data.OfferingTypeName}</Col>
          </Row>
        )}
        {mobileView && (
          <Row>
            <Col span="10">Def Section:</Col>
            <Col span="14">{data.SectionTypeName}</Col>
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
      responsiveColumnIndices={[1, 2, 3, 4, 5]}
      expandableRowRender={expandableRowRender}
      rowKey="OfferingID"
      pagination={{ position: ["topLeft"], pageSize: 20 }}
      scroll={{ y: props.isModal ? Math.floor(window.innerHeight * 0.45) : 600 }}
      rowSelection={props.rowSelection}
    />
  )
}
