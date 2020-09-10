import React from "react"
import { Switch, Row, Col } from "antd"
import { ColumnsType } from "antd/lib/table"
import ResponsiveTable from "~/Component/ResponsiveTable"

interface ITagsTableProps {
  data: Array<any>
  loading: boolean
  title: string
  select?: (tag: { [key: string]: any }, add: boolean) => Promise<any>
}

type RecordType = { [key: string]: string }
export default function TagsTable(props: ITagsTableProps) {
  const columns: ColumnsType<RecordType> = [
    {
      title: "Tag type",
      dataIndex: "TagType",
      key: "TagType"
    },
    {
      title: "Tag",
      dataIndex: "Name",
      key: "Name"
    }
  ]

  if (props.title === "Offering Tags") {
    columns.push({
      title: "Status",
      dataIndex: "isChecked",
      key: "isChecked",
      render: (text: any, record: any) => (
        <Switch
          defaultChecked={!!text}
          onClick={async (checked, e) => {
            if (props.select && record && record.ID && typeof record.ID === "number") {
              const response = await props.select(record, checked)
              if (!response.success) {
                console.log(response)
              }
            }
          }}
        />
      )
    })
  }
  function expandableRowRender(data: any, display: boolean) {
    return (
      <div style={{ border: "1px solid", padding: "5px" }}>
        {display && (
          <Row>
            <Col span="10">Tag Name:</Col>
            <Col span="14">{data.Name}</Col>
          </Row>
        )}
        <Row>
          <Col span="10">Description:</Col>
          <Col span="14">{data.Description}</Col>
        </Row>
      </div>
    )
  }

  return (
    <ResponsiveTable
      title={() => props.title}
      columns={columns}
      dataSource={props.data}
      rowKey="ID"
      pagination={{ position: ["topRight"], pageSize: 20 }}
      size="small"
      bordered
      loading={props.loading}
      breakpoints={["md", "lg", "xl", "xxl"]}
      responsiveColumnIndices={[1]}
      expandableRowRender={expandableRowRender}
      scroll={{ y: 400 }}
    />
  )
}
