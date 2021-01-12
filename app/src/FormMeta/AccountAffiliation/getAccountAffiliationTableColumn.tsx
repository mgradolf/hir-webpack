import React from "react"
import { Link } from "react-router-dom"
import { getAccountAffiliation } from "~/ApiServices/Service/AccountService"
import {
  renderBoolean,
  renderDate,
  renderEmail,
  sortByBoolean,
  sortByString,
  TableColumnType
} from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getAccountAffiliationTableColumn = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Last Name",
      dataIndex: "LastName",
      render: (text, record) => (isModal ? text : <Link to={`/person/${record.PersonID}`}>{text}</Link>),
      sorter: (a: any, b: any) => sortByString(a?.LastName[0], b?.LastName[0])
    },
    {
      title: "First Name",
      dataIndex: "FirstName",
      render: (text, record) => (isModal ? text : <Link to={`/person/${record.PersonID}`}>{text}</Link>)
    },
    { title: "Email", dataIndex: "EmailAddress", render: renderEmail },
    { title: "Birth Date", dataIndex: "Birthday", render: renderDate },
    { title: "Role ", dataIndex: "AffiliationRoleTypeName" },
    { title: "Shared", dataIndex: "IsContactShared", render: renderBoolean },
    { title: "Status", dataIndex: "AccountAffiliationStatusName" },
    {
      title: "Primary Contact",
      dataIndex: "PrimaryAccountAffiliation",
      render: renderBoolean,
      sorter: (a: any, b: any) => sortByBoolean(a.PrimaryAccountAffiliation, b.PrimaryAccountAffiliation),
      sortOrder: "ascend"
    }
  ]
  return { columns, searchFunc: getAccountAffiliation, responsiveColumnIndices: [], expandableColumnIndices: [] }
}
