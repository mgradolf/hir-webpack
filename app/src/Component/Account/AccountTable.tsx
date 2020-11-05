import React from "react"
import { ResponsiveTable, TableColumnType } from "~/Component/Common/ResponsiveTable"

interface IPerson {
  dataSource: any[]
  loading: boolean
  isModal: boolean
  rowSelection?: any
}
export default function AccountTable(props: IPerson) {
  const columns: TableColumnType = [
    { title: "Account Type", dataIndex: "AccountTypeName", width: 150 },
    { title: "Account Name", dataIndex: "AccountName", width: 150 },
    { title: "Contact Name", dataIndex: "ContactName", width: 150 },
    { title: "Phone", dataIndex: "TelephoneNumber", width: 150 },
    { title: "Email Address", dataIndex: "EmailAddress", width: 150 },
    { title: "Address", dataIndex: "BillingAddress", width: 150 }
  ]
  return (
    <ResponsiveTable
      columns={columns}
      dataSource={props.dataSource}
      isModal={true}
      loading={props.loading}
      rowSelection={props.rowSelection}
      rowKey="AccountID"
      pagination={{ position: ["topLeft"], pageSize: 20 }}
    />
  )
}
