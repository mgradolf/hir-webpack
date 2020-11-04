import React from "react"
import moment from "moment"
import { Row, Col } from "antd"
import { ResponsiveTable, TableColumnType } from "~/Component/Common/ResponsiveTable"

export interface ITableWrapperProps {
  dataSource: Array<any>
  loading: boolean
  isModal?: boolean
  rowSelection?: any
}

export function RequestActivityTable(props: ITableWrapperProps) {
  const columns: TableColumnType = [
    {
      title: "Date",
      dataIndex: "ActivityDate",
      key: "ActivityDate",
      render: (text: any) => (text !== null ? moment(text).format("YYYY-MM-DD hh:mm A") : "")
    },
    {
      title: "Source",
      dataIndex: "ActivitySource",
      key: "ActivitySource"
    },
    {
      title: "Activity By",
      dataIndex: "ActivityBy",
      key: "ActivityBy"
    },
    {
      title: "ActivityDescription",
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
      rowKey="ActivityDate"
      pagination={{ position: ["topLeft"], pageSize: 20 }}
      scroll={{ y: props.isModal ? Math.floor(window.innerHeight * 0.45) : 600 }}
      rowSelection={props.rowSelection}
    />
  )
}
