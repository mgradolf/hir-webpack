import React from "react"
import moment from "moment"
import { Space, Row, Col, Button } from "antd"
import ResponsiveTable, { RecordType } from "~/Component/Common/ResponsiveTable"
import { ColumnsType } from "antd/lib/table"

export interface ITableWrapperProps {
  dataSource: Array<any>
  loading: boolean
  isModal?: boolean
  rowSelection?: any
}

export function RequestTable(props: ITableWrapperProps) {
  const columns: ColumnsType<RecordType> = [
    {
      title: "Request ID",
      dataIndex: "RequestID",
      key: "RequestID"
    },
    {
      title: "Creation Time",
      dataIndex: "CreateDate",
      key: "CreateDate",
      render: (text: any) => (text !== null ? moment(text).format("YYYY-MM-DD hh:mm A") : "")
    },
    {
      title: "RequestType",
      dataIndex: "RequestType",
      key: "RequestType"
    },
    {
      title: "Request Status",
      dataIndex: "State",
      key: "State"
    },
    {
      title: "Expiration Time",
      dataIndex: "ExpirationDate",
      key: "ExpirationDate",
      render: (text: any) => (text !== null ? moment(text).format("YYYY-MM-DD hh:mm A") : "")
    },
    {
      title: "Source",
      dataIndex: "Source",
      key: "Source"
    },
    {
      title: "Purchaser",
      dataIndex: "PurchaserPersonName",
      key: "PurchaserPersonName"
    },
    {
      title: "Account",
      dataIndex: "AccountName",
      key: "AccountName"
    },
    {
      title: "Staff",
      dataIndex: "RequesterStaffUserName",
      key: "RequesterStaffUserName"
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <Button>View Details</Button>
        </Space>
      )
    }
  ]

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
      rowKey="RequestID"
      pagination={{ position: ["topLeft"], pageSize: 20 }}
      scroll={{ y: props.isModal ? Math.floor(window.innerHeight * 0.45) : 600 }}
      rowSelection={props.rowSelection}
    />
  )
}
