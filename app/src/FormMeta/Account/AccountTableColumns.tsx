import React from "react"
import { Link } from "react-router-dom"
import { findAccountForLookUp } from "~/ApiServices/BizApi/account/accountIF"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getAccountTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    { title: "Account Type", dataIndex: "AccountTypeName" },
    {
      title: "Account Name",
      dataIndex: "AccountName",
      render: (text: any, record: any) => (isModal ? { text } : <Link to={`/account/${record.AccountID}`}>{text}</Link>)
    },
    { title: "Primary Contact", dataIndex: "ContactName" },
    { title: "Phone", dataIndex: "TelephoneNumber" },
    { title: "Email", dataIndex: "EmailAddress" },
    { title: "Address", dataIndex: "BillingAddress" }
  ]
  return { columns, searchFunc: findAccountForLookUp, responsiveColumnIndices: [], expandableColumnIndices: [] }
}
