import React from "react"
import { renderDateTime, TableColumnType } from "~/Component/Common/ResponsiveTable"
import SearchPage from "~/Component/Common/Page/SearchPage"
import { getLiteRequests } from "~/ApiServices/Service/RequestService"
import { requestMeta } from "~/FormMeta/Request/RequestSearchFilterMeta"
import { Col, Row, Space } from "antd"
import moment from "moment"
import { Link } from "react-router-dom"

export default function PersonTable() {
  const columns: TableColumnType = [
    {
      title: "Request ID",
      dataIndex: "RequestID",
      key: "RequestID",
      render: (text: any, record: any) => <Link to={`/requests/${record.RequestID}`}>{text}</Link>
    },
    {
      title: "Creation Time",
      dataIndex: "CreateDate",
      key: "CreateDate",
      render: renderDateTime
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
      render: renderDateTime
    },
    {
      title: "Source",
      dataIndex: "Source",
      key: "Source"
    },
    {
      title: "Purchaser",
      dataIndex: "PurchaserPersonName",
      render: (text: any, record: any) => <Link to={`/person/${record.PersonID}`}>{text}</Link>,
      key: "PurchaserPersonName"
    },
    {
      title: "Account",
      dataIndex: "AccountName",
      render: (text: any, record: any) => <Link to={`/account/${record.PersonID}`}>{text}</Link>,
      key: "AccountName"
    },
    {
      title: "Staff",
      dataIndex: "RequesterStaffUserName",
      render: (text: any, record: any) => <Link to={`/person/${record.PersonID}`}>{text}</Link>,
      key: "RequesterStaffUserName"
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <Link to={`/requests/${record.RequestID}`}>View Details</Link>
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
    <SearchPage
      title="Requests"
      meta={requestMeta}
      hideSearchField={false}
      tableProps={{
        columns: columns,
        expandableRowRender: expandableRowRender,
        searchFunc: (Params: any) => {
          return getLiteRequests(Params).then((x) => {
            x.data = x.success ? x.data.Requests : x.data
            return x
          })
        },
        rowKey: "RequestID",
        pagination: { position: ["topLeft"], pageSize: 20 }
      }}
    ></SearchPage>
  )
}
