import React from "react"
import ResponsiveTable, { RecordType } from "~/Component/Common/ResponsiveTable"
import { ColumnsType } from "antd/lib/table"
import { Button } from "antd"

export interface IWaitListEntryTable {
  dataSource: Array<any>
  loading: boolean
  isModal?: boolean
  rowSelection?: any
  setEntryToEdit: (Params: any) => void
  removeEntry: (ID: number) => void
}

export default function WaitListEntryTable(props: IWaitListEntryTable) {
  const columns: ColumnsType<RecordType> = [
    {
      title: "SectionNumber",
      dataIndex: "SectionNumber",
      key: "WaitListEntryID",
      width: 150
    },
    {
      title: "SeatGroupName",
      dataIndex: "SeatGroupName",
      key: "WaitListEntryID",
      width: 150
    },
    {
      title: "AccountName",
      dataIndex: "AccountName",
      key: "WaitListEntryID",
      width: 150
    },
    {
      title: "PurchaserName",
      dataIndex: "PurchaserName",
      key: "WaitListEntryID",
      width: 150
    },
    {
      title: "StudentName",
      dataIndex: "StudentName",
      key: "WaitListEntryID",
      width: 150
    },
    {
      title: "Email",
      dataIndex: "StudentEmailAddress",
      key: "WaitListEntryID",
      width: 150
    },
    {
      title: "Request State",
      dataIndex: "RequestState",
      key: "WaitListEntryID",
      width: 150
    },
    {
      title: "Priority",
      dataIndex: "Priority",
      key: "WaitListEntryID",
      width: 150
    },
    {
      title: "Email",
      dataIndex: "StudentEmailAddress",
      key: "WaitListEntryID",
      width: 150
    },
    {
      title: "CreationTime",
      dataIndex: "CreationTime",
      key: "WaitListEntryID",
      width: 150
    },
    {
      title: "ExpirationTime",
      dataIndex: "RequestExpirationTime",
      key: "WaitListEntryID",
      width: 150
    },
    {
      title: "Source",
      dataIndex: "Source",
      key: "WaitListEntryID",
      width: 150
    },
    {
      title: "Edit",
      key: "WaitListEntryID",
      render: (text: any, record: any) => {
        return (
          <>
            <Button
              type="primary"
              onClick={() => {
                props.setEntryToEdit(record)
              }}
            >
              Edit
            </Button>
            <Button
              danger
              onClick={() => {
                props.removeEntry(record.WaitListEntryID)
              }}
            >
              Remove
            </Button>
          </>
        )
      }
    }
  ]

  return (
    <ResponsiveTable
      columns={columns}
      dataSource={props.dataSource}
      loading={props.loading}
      bordered
      rowKey="WaitListEntryID"
      pagination={{ position: ["topLeft"], pageSize: 20 }}
      scroll={{ x: 300 }}
    />
  )
}
