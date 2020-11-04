import React from "react"
import { Link } from "react-router-dom"
import { ResponsiveTable, TableColumnType } from "~/Component/Common/ResponsiveTable"

interface IPerson {
  dataSource: any[]
  loading: boolean
  isModal: boolean
  rowSelection?: any
}
export default function PersonTable(props: IPerson) {
  const columns: TableColumnType = [
    {
      title: "Name",
      width: 150,
      render: (text: any, record: any) => (
        <Link to={`/person/${record.PersonID}`}>{`${record.FirstName} ${record.LastName}`}</Link>
      )
    },
    { title: "Role Name", dataIndex: "RoleName", width: 150 },
    { title: "Address", dataIndex: "Address", width: 150 },
    { title: "City", dataIndex: "City", width: 150 },
    { title: "Postal Code", dataIndex: "PostalCode", width: 150 },
    { title: "Email Address", dataIndex: "EmailAddress", width: 150 },
    { title: "Telephone Number", dataIndex: "TelephoneNumber", width: 150 },
    { title: "Account Name", dataIndex: "AccountName", width: 150 }
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
