import React from "react"
import { Button, Dropdown } from "antd"
import { renderBoolean, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { DownOutlined } from "@ant-design/icons"
import PersonEduMenu from "~/Component/Person/PersonEduMenu"
import { Link } from "react-router-dom"
import { getAccountAffiliation } from "~/ApiServices/Service/AccountService"

export const getPersonAccountTableColumns = (): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Account",
      dataIndex: "AccountName",
      render: (text: any, record: any) => <Link to={`/account/${record.AccountID}`}>{text}</Link>
    },
    { title: "Role ", dataIndex: "AffiliationRoleTypeName" },
    { title: "Shared", dataIndex: "IsContactShared", render: renderBoolean },
    { title: "Status", dataIndex: "AccountAffiliationStatusName" },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Dropdown overlay={<PersonEduMenu PersonID={record.PersonID} initialData={record} />} trigger={["click"]}>
          <Button type="primary" onClick={(e) => e.preventDefault()}>
            Go To <DownOutlined />
          </Button>
        </Dropdown>
      )
    }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: getAccountAffiliation }
}
