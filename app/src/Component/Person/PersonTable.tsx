import { ColumnsType } from "antd/lib/table"
import React from "react"
import ResponsiveTable, { RecordType } from "~/Component/Common/ResponsiveTable"

interface IPerson {
  dataSource: any[]
  loading: boolean
  isModal: boolean
  rowSelection?: any
}
export default function PersonTable(props: IPerson) {
  const columns: ColumnsType<RecordType> = [
    { title: "First Name", dataIndex: "FirstName", width: 150 },
    { title: "Last Name", dataIndex: "LastName", width: 150 },
    { title: "Middle Name", dataIndex: "MiddleName", width: 150 },
    { title: "Other Name", dataIndex: "OtherName", width: 150 },
    { title: "Address", dataIndex: "Address", width: 150 },
    { title: "City", dataIndex: "City", width: 150 },
    { title: "Postal Code", dataIndex: "PostalCode", width: 150 },
    { title: "Email Address", dataIndex: "EmailAddress", width: 150 },
    { title: "Telephone Number", dataIndex: "TelephoneNumber", width: 150 },
    { title: "Account Name", dataIndex: "AccountName", width: 150 },
    { title: "Role Name", dataIndex: "RoleName", width: 150 },
    { title: "Name", dataIndex: "Name", width: 150 }
  ]
  return (
    <ResponsiveTable
      columns={columns}
      dataSource={props.dataSource}
      isModal={true}
      loading={props.loading}
      rowSelection={props.rowSelection}
      rowKey="PersonID"
      pagination={{ position: ["topLeft"], pageSize: 20 }}
    />
  )
}
