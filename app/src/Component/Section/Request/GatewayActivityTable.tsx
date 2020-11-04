import React from "react"
import { Row, Col } from "antd"
import { renderDateTime, ResponsiveTable, TableColumnType } from "~/Component/Common/ResponsiveTable"

export interface ITableWrapperProps {
  dataSource: Array<any>
  loading: boolean
  isModal?: boolean
  rowSelection?: any
}

export function GatewayActivityTable(props: ITableWrapperProps) {
  const columns: TableColumnType = [
    {
      title: "Activity ID",
      dataIndex: "ActivityID",
      key: "ActivityID"
    },
    {
      title: "Activity Time",
      dataIndex: "ActivityTime",
      key: "ActivityTime",
      render: renderDateTime
    },
    {
      title: "Person",
      dataIndex: "Person",
      key: "Person"
    },
    {
      title: "Activity State",
      dataIndex: "ActivityState",
      key: "ActivityState"
    },
    {
      title: "Request Amount",
      dataIndex: "ActivityDescription",
      key: "ActivityDescription"
    },
    {
      title: "Response Time",
      dataIndex: "ActivityDescription",
      key: "ActivityDescription"
    },
    {
      title: "Transaction No",
      dataIndex: "ActivityDescription",
      key: "ActivityDescription"
    },
    {
      title: "Transaction Status",
      dataIndex: "ActivityDescription",
      key: "ActivityDescription"
    },
    {
      title: "Auth Code",
      dataIndex: "ActivityDescription",
      key: "ActivityDescription"
    },
    {
      title: "Error Description",
      dataIndex: "ActivityDescription",
      key: "ActivityDescription"
    },
    {
      title: "Error Reason",
      dataIndex: "ActivityDescription",
      key: "ActivityDescription"
    },
    {
      title: "Payment Type",
      dataIndex: "ActivityDescription",
      key: "ActivityDescription"
    },
    {
      title: "CC Type",
      dataIndex: "ActivityDescription",
      key: "ActivityDescription"
    },
    {
      title: "Billing",
      dataIndex: "ActivityDescription",
      key: "ActivityDescription"
    },
    {
      title: "Billing Name",
      dataIndex: "ActivityDescription",
      key: "ActivityDescription"
    },
    {
      title: "Billing Street",
      dataIndex: "ActivityDescription",
      key: "ActivityDescription"
    },
    {
      title: "Billing City",
      dataIndex: "ActivityDescription",
      key: "ActivityDescription"
    },
    {
      title: "Billing State",
      dataIndex: "ActivityDescription",
      key: "ActivityDescription"
    },
    {
      title: "Billing Country",
      dataIndex: "ActivityDescription",
      key: "ActivityDescription"
    },
    {
      title: "Billing Post code",
      dataIndex: "ActivityDescription",
      key: "ActivityDescription"
    },
    {
      title: "Billing Email",
      dataIndex: "ActivityDescription",
      key: "ActivityDescription"
    },
    {
      title: "Gateway Account",
      dataIndex: "ActivityDescription",
      key: "ActivityDescription"
    }
  ]

  function expandableRowRender(data: any, mobileView: boolean) {
    return (
      <>
        {mobileView && (
          <div style={{ border: "1px solid", padding: "5px" }}>
            <Row>
              <Col span="10">Activity By:</Col>
              <Col span="14">{data.ActivityBy}</Col>
            </Row>
            <Row>
              <Col span="10">Description:</Col>
              <Col span="14">{data.ActivityDescription}</Col>
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
      responsiveColumnIndices={[2, 3]}
      expandableRowRender={expandableRowRender}
      rowKey="ActivityID"
      pagination={{ position: ["topLeft"], pageSize: 20 }}
      scroll={{ y: props.isModal ? Math.floor(window.innerHeight * 0.45) : 600 }}
      rowSelection={props.rowSelection}
    />
  )
}
