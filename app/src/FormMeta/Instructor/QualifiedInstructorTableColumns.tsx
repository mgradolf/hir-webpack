import { Button } from "antd"
import React from "react"
import { Link } from "react-router-dom"
import { getQualifiedInstructors } from "~/ApiServices/Service/OfferingService"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getQualifiedInstructorTableColumns = (OfferingID: number): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text: any, record: any) => <Link to={`/person/faculty/${record.FacultyID}`}>{text}</Link>,
      sorter: (a: any, b: any) => a.name.length - b.name.length
    },
    { title: "Email", dataIndex: "email" },
    { title: "Telephone", dataIndex: "telephone" },
    { title: "Address", dataIndex: "Address" },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: any) => (
        <Button danger type="primary">
          Remove
        </Button>
      )
    }
  ]

  return { columns, searchFunc: () => getQualifiedInstructors(OfferingID) }
}
