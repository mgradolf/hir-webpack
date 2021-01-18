import React from "react"
import { Link } from "react-router-dom"
import { findAccountForLookUp } from "~/ApiServices/BizApi/account/accountIF"
import { renderEmail, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getSectionTypeTypeTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Account",
      dataIndex: "AccountName",
      render: (text: any, record: any) => (isModal ? text : <Link to={`/account/${record.AccountID}`}>{text}</Link>)
    },
    {
      title: "Primary Contact",
      dataIndex: "ContactName",
      render: (text: any, record: any) =>
        isModal || !text ? text : <Link to={`/person/${record.PersonID}`}>{text}</Link>
    },
    { title: "Email", dataIndex: "EmailAddress", render: renderEmail },
    { title: "Telephone", dataIndex: "TelephoneNumber" },
    { title: "Account Type", dataIndex: "AccountTypeName" }
  ]
  return { columns, searchFunc: findAccountForLookUp, responsiveColumnIndices: [], expandableColumnIndices: [] }
}
