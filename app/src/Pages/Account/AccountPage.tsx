import React from "react"
import AccountSearchFilterMeta from "~/FormMeta/Account/AccountSearchFilterMeta"
import { findAccountForLookUp } from "~/ApiServices/BizApi/account/accountIF"
import SearchPage from "~/Component/Common/Page/SearchPage"

import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { Link } from "react-router-dom"

export default function AccountPage() {
  const columns: TableColumnType = [
    {
      title: "Account Name",
      dataIndex: "AccountName",
      render: (text: any, record: any) => <Link to={`/account/${record.AccountID}`}>{record.AccountName}</Link>,
      width: 150
    },
    { title: "Account Type", dataIndex: "AccountTypeName", width: 150 },
    { title: "Contact Name", dataIndex: "ContactName", width: 150 },
    { title: "Phone", dataIndex: "TelephoneNumber", width: 150 },
    { title: "Email Address", dataIndex: "EmailAddress", width: 150 },
    { title: "Address", dataIndex: "BillingAddress", width: 150 }
  ]
  return (
    <SearchPage
      title="Accounts"
      meta={AccountSearchFilterMeta}
      hideSearchField={false}
      tableProps={{
        columns: columns,
        searchFunc: findAccountForLookUp,
        rowKey: "AccountID",
        pagination: { position: ["topLeft"], pageSize: 20 }
      }}
    ></SearchPage>
  )
}
