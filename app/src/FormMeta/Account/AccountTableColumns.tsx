import React from "react"
import { Link } from "react-router-dom"
import { findAccountForLookUp } from "~/ApiServices/BizApi/account/accountIF"
import { renderEmail, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getAccountTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Account Name",
      dataIndex: "AccountName",
      render: (text: any, record: any) => (isModal ? text : <Link to={`/account/${record.AccountID}`}>{text}</Link>)
    },
    {
      title: "Primary Contact",
      dataIndex: "ContactName",
      render: (text: any, record: any) =>
        isModal || !text ? text : <Link to={`/person/${record.PersonID}`}>{text}</Link>
    },
    { title: "Phone", dataIndex: "TelephoneNumber" },
    { title: "Email", dataIndex: "EmailAddress", render: renderEmail },
    { title: "Account Type", dataIndex: "AccountTypeName" }
    // { title: "Address", dataIndex: "BillingAddress" }
  ]
  return { columns, searchFunc: findAccountForLookUp, responsiveColumnIndices: [], expandableColumnIndices: [] }
}
