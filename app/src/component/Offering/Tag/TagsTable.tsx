import React from "react"
import { Switch, Table, Card } from "antd"

interface ITagsTableProps {
  data: Array<any>
  loading: boolean
  title: string
}
export default function TagsTable(props: ITagsTableProps) {
  const columns = [
    {
      title: "Tag type",
      dataIndex: "TagType",
      key: "TagType"
    },
    {
      title: "Tag",
      dataIndex: "Name",
      key: "Name"
    },
    {
      title: "Status",
      dataIndex: "isChecked",
      key: "isChecked",
      render: (text: any, record: any) => <Switch checked={!!text} onChange={(e) => console.log(e, text, record)} />
    }
  ]
  function expandableRowRender(data: any) {
    return data.Description ? <div style={{ padding: "5px" }}>{data.Description}</div> : <></>
  }
  return (
    <Card title={props.title}>
      <Table
        columns={columns}
        dataSource={props.data}
        rowKey="ID"
        pagination={{ position: ["topLeft"] }}
        size="small"
        loading={props.loading}
        expandedRowRender={expandableRowRender}
      />
    </Card>
  )
}
