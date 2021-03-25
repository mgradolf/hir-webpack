import React from "react"
import { Link } from "react-router-dom"
import { renderEmail, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { ReadOutlined } from "@ant-design/icons"
import { findAllUsers } from "~/ApiServices/Service/UserService"

export const getUserTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      ...(!isModal && {
        dataIndex: "name",
        render: (text: any, record: any) => (
          <Link to={`/user/${text}`}>
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

  return { columns, searchFunc: findAllUsers, tableName: "UserTableColumns" }
}
