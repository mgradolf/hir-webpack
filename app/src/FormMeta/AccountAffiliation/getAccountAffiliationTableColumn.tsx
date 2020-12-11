import React from "react"
import { Link } from "react-router-dom"
import { getAccountAffiliation } from "~/ApiServices/Service/AccountService"
import { renderBoolean, renderDate, renderEmail, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getAccountAffiliationTableColumn = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Last Name",
      dataIndex: "LastName",
      render: (text, record) => (isModal ? text : <Link to={`/person/${record.PersonID}`}>{text}</Link>)
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
    { title: "Primary Contact", dataIndex: "PrimaryAccountAffiliation", render: renderBoolean }
  ]
  return { columns, searchFunc: getAccountAffiliation, responsiveColumnIndices: [], expandableColumnIndices: [] }
}
