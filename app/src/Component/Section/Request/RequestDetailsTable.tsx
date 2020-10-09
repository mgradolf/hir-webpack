import React from "react"
import { Space, Row, Col } from "antd"
import ResponsiveTable, { RecordType } from "~/Component/Common/ResponsiveTable"
import { ColumnsType } from "antd/lib/table"
import RequestDetailsMenu from "~/Component/Section/Request/RequestDetailsMenu"

export interface ITableWrapperProps {
  dataSource: Array<any>
  loading: boolean
  isModal?: boolean
  rowSelection?: any
}

export function RequestDetailsTable(props: ITableWrapperProps) {
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
      dataIndex: "State",
      key: "State"
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <RequestDetailsMenu task={record} />
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
