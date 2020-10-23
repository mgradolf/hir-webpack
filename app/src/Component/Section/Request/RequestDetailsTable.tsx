import React from "react"
import { Space, Row, Col, Button, Dropdown } from "antd"
import ResponsiveTable, { RecordType } from "~/Component/Common/ResponsiveTable"
import { ColumnsType } from "antd/lib/table"
import RequestDetailsMenu from "~/Component/Section/Request/RequestDetailsMenu"
import {
  PROCESSED_REQUEST_STATE_ID,
  ERROR_REQUEST_STATE_ID,
  ACTION_REQUIRED_REQUEST_STATE_ID,
  REQUEST_TASK_TYPE_NAME
} from "~/utils/Constants"
import { DownOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"

export interface ITableWrapperProps {
  dataSource: any
  loading: boolean
  isModal?: boolean
  rowSelection?: any
}

export function RequestDetailsTable(props: ITableWrapperProps) {
  const requestData = props.dataSource.ContextData.RequestData

  const extraDataSource = {
    AccountID: props.dataSource.AccountID,
    PaymentTypeName: requestData.PaymentTypeName,
    PaymentTypeID: requestData.PaymentTypeID,
    PaymentAmount: requestData.TotalPaymentAmount,
    PaymentGatewayAccountID: requestData.Allocation[0].PaymentGatewayAccountID
  }

  const columns: ColumnsType<RecordType> = [
    {
      title: "Processing",
      dataIndex: "TaskType",
      key: "TaskType"
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description"
    },
    {
      title: "Recipient",
      dataIndex: "RecipientPersonName",
      key: "RecipientPersonName"
    },
    {
      title: "Issues",
      dataIndex: "Issues",
      key: "Issues",
      render: (issues: any) => (issues != null ? issues.length : 0)
    },
    {
      title: "Status",
      key: "State",
      render: (record: any) =>
        record.Issues !== null && record.Issues.length > 0 ? record.Issues[0].Description : record.State
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          {record.StateID === PROCESSED_REQUEST_STATE_ID && record.TaskType === REQUEST_TASK_TYPE_NAME.ORDER && (
            <Link to={`/order/${record.ProcessResult.OrderID}`}>View Records</Link>
          )}
          {record.StateID === PROCESSED_REQUEST_STATE_ID && record.TaskType === REQUEST_TASK_TYPE_NAME.REGISTRATION && (
            <Link to={`/seatgroup/${record.ProcessResult.SeatGroupID}`}>View Records</Link>
          )}
          {record.StateID === PROCESSED_REQUEST_STATE_ID &&
            record.TaskType === REQUEST_TASK_TYPE_NAME.EXTERNAL_GATEWAY_PAYMENT && (
              <Link to={`/gateway_activity/${record.ProcessResult.PaymentGatewayActivityID}`}>View Records</Link>
            )}
          {record.StateID === PROCESSED_REQUEST_STATE_ID &&
            record.TaskType === REQUEST_TASK_TYPE_NAME.PURCHASE_ORDER && (
              <Link to={`/purchase_order/${record.ProcessResult.PurchaseOrderID}`}>View Records</Link>
            )}
          {(record.StateID === ACTION_REQUIRED_REQUEST_STATE_ID || record.StateID === ERROR_REQUEST_STATE_ID) &&
            record.Issues.length > 0 &&
            record.UpdatedResponse === undefined && (
              <Dropdown
                overlay={<RequestDetailsMenu taskJson={record} extraDataSource={extraDataSource} />}
                trigger={["click"]}
              >
                <Button type="link" onClick={(e) => e.preventDefault()}>
                  Actions <DownOutlined />
                </Button>
              </Dropdown>
            )}
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
              <Col span="10">Description:</Col>
              <Col span="14">{data.Description}</Col>
            </Row>
            <Row>
              <Col span="10">Recipient:</Col>
              <Col span="14">{data.RecipientPersonName}</Col>
            </Row>
            <Row>
              <Col span="10">Issues:</Col>
              <Col span="14">{data.Issues.length}</Col>
            </Row>
            <Row>
              <Col span="10">Status:</Col>
              <Col span="14">{data.State}</Col>
            </Row>
          </div>
        )}
      </>
    )
  }

  return (
    <ResponsiveTable
      columns={columns}
      dataSource={props.dataSource.Tasks.Tasks}
      loading={props.loading}
      bordered
      breakpoints={["md", "lg", "xl", "xxl"]}
      responsiveColumnIndices={[1, 2, 3, 4]}
      expandableRowRender={expandableRowRender}
      rowKey="RequestID"
      pagination={{ position: ["topLeft"], pageSize: 20 }}
      rowSelection={props.rowSelection}
      isModal={props.isModal}
      scroll={{ y: props.isModal ? Math.floor(window.innerHeight * 0.45) : 500 }}
    />
  )
}
