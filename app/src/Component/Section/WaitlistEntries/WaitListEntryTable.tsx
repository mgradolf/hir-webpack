import React from "react"
import ResponsiveTable, { RecordType } from "~/Component/Common/ResponsiveTable"
import { ColumnsType } from "antd/lib/table"

export interface IWaitListEntryTable {
  dataSource: Array<any>
  loading: boolean
  isModal?: boolean
  rowSelection?: any
}

export default function WaitListEntryTable(props: IWaitListEntryTable) {
  const columns: ColumnsType<RecordType> = [
    {
      title: "SectionNumber",
      dataIndex: "SectionNumber",
      width: 150
    },
    {
      title: "SeatGroupName",
      dataIndex: "SeatGroupName",
      width: 150
    },
    {
      title: "AccountName",
      dataIndex: "AccountName",
      width: 150
    },
    {
      title: "PurchaserName",
      dataIndex: "PurchaserName",
      width: 150
    },
    {
      title: "StudentName",
      dataIndex: "StudentName",
      width: 150
    },
    {
      title: "Email",
      dataIndex: "StudentEmailAddress",
      width: 150
    },
    {
      title: "Request State",
      dataIndex: "RequestState",
      width: 150
    },
    {
      title: "Priority",
      dataIndex: "Priority",
      width: 150
    },
    {
      title: "Email",
      dataIndex: "StudentEmailAddress",
      width: 150
    },
    {
      title: "CreationTime",
      dataIndex: "CreationTime",
      width: 150
    },
    {
      title: "ExpirationTime",
      dataIndex: "RequestExpirationTime",
      width: 150
    },
    {
      title: "Source",
      dataIndex: "Source",
      width: 150
    }
  ]

  return (
    <ResponsiveTable
      columns={columns}
      dataSource={props.dataSource}
      loading={props.loading}
      bordered
      rowKey="PurchaserID"
      pagination={{ position: ["topLeft"], pageSize: 10 }}
      scroll={{ x: 300 }}
    />
  )
}
