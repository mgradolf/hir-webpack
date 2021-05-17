import React from "react"
import { renderBoolean, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { Link } from "react-router-dom"
import { getAccountAffiliation } from "~/ApiServices/Service/AccountService"
import PersonAccountMenu from "~/Component/Feature/Person/PersonAccountMenu"

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
      render: (record: any) => <PersonAccountMenu initialData={record} />
    }
  ]

  return { columns, searchFunc: getAccountAffiliation, tableName: "PersonAccountTableColumns" }
}
