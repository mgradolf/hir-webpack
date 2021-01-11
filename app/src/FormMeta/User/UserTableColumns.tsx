import React from "react"
import { Link } from "react-router-dom"
import { renderEmail, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
import { ReadOutlined } from "@ant-design/icons"
import { findAllUsers } from "~/ApiServices/Service/UserService"

export const getUserTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      ...(!isModal && {
        title: "",
        dataIndex: "",
        render: (text: any, record: any) => (
          <Link to={`/user/${record.name}`}>
            <ReadOutlined />
          </Link>
        )
      })
    },
    { title: "Login Name", dataIndex: "name" },
    { title: "First Name", dataIndex: "firstName" },
    { title: "Middle Name", dataIndex: "middleName" },
    { title: "Last Name", dataIndex: "lastName" },
    { title: "Email", dataIndex: "email", render: renderEmail }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: findAllUsers }
}
