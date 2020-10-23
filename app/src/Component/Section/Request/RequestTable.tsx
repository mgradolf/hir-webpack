import React from "react"
import moment from "moment"
import { Space, Row, Col } from "antd"
import ResponsiveTable, { RecordType } from "~/Component/Common/ResponsiveTable"
import { ColumnsType } from "antd/lib/table"
import { Link } from "react-router-dom"

export interface ITableWrapperProps {
  dataSource: Array<any>
  loading: boolean
  isModal?: boolean
  rowSelection?: any
  sectionId?: number
}

export function RequestTable(props: ITableWrapperProps) {
  const columns: ColumnsType<RecordType> = [
    {
      title: "Request ID",
      dataIndex: "RequestID",
      key: "RequestID",
      render: (text: any, record: any) =>
        props.isModal ? (
          text
        ) : props.sectionId ? (
          <Link to={`/section/${props.sectionId}/request/${record.RequestID}`}>{text}</Link>
        ) : (
          <Link to={`/requests/${record.RequestID}`}>{text}</Link>
        )
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
          {props.sectionId && <Link to={`/section/${props.sectionId}/request/${record.RequestID}`}>View Details</Link>}
          {!props.sectionId && <Link to={`/requests/${record.RequestID}`}>View Details</Link>}
        </Space>
      )
    }
  ]

  function expandableRowRender(data: any, mobileView: boolean) {
    return (
      <>
        {mobileView && (
          <div style={{ border: "1px solid", padding: "5px" }}>
            <Row>
              <Col span="10">Creation Time:</Col>
              <Col span="14">{data.CreateDate ? moment(data.CreateDate).format("YYYY-MM-DD hh:mm A") : ""}</Col>
            </Row>
            <Row>
              <Col span="10">Request Type:</Col>
              <Col span="14">{data.RequestType}</Col>
            </Row>
            <Row>
              <Col span="10">Request Status:</Col>
              <Col span="14">{data.State}</Col>
            </Row>
            <Row>
              <Col span="10">Expiration Time:</Col>
              <Col span="14">{data.ExpirationDate ? moment(data.ExpirationDate).format("YYYY-MM-DD hh:mm A") : ""}</Col>
            </Row>
            <Row>
              <Col span="10">Source:</Col>
              <Col span="14">{data.Source}</Col>
            </Row>
            <Row>
              <Col span="10">Purchaser:</Col>
              <Col span="14">{data.PurchaserPersonName}</Col>
            </Row>
            <Row>
              <Col span="10">Account:</Col>
              <Col span="14">{data.AccountName}</Col>
            </Row>
            <Row>
              <Col span="10">Staff:</Col>
              <Col span="14">{data.RequesterStaffUserName}</Col>
            </Row>
          </div>
        )}
      </>
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
      isModal={props.isModal}
      rowSelection={props.rowSelection}
    />
  )
}
