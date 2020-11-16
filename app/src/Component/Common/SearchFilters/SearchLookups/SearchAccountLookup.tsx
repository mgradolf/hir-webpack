import * as React from "react"
import AccountSearchFilterMeta from "~/FormMeta/Account/AccountSearchFilterMeta"
import { findAccountForLookUp } from "~/ApiServices/BizApi/account/accountIF"
import { SearchLookupOpenButton } from "~/Component/Common/SearchFilters/SearchLookupOpenButton"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { IFilterFieldComponent, IFilterGenericComponentProps } from "~/Component/Common/SearchFilters/common"

export function SearchAccountLookup(props: IFilterGenericComponentProps<IFilterFieldComponent>) {
  const columns: TableColumnType = [
    { title: "Account Type", dataIndex: "AccountTypeName", width: 150 },
    { title: "Account Name", dataIndex: "AccountName", width: 150 },
    { title: "Contact Name", dataIndex: "ContactName", width: 150 },
    { title: "Phone", dataIndex: "TelephoneNumber", width: 150 },
    { title: "Email Address", dataIndex: "EmailAddress", width: 150 },
    { title: "Address", dataIndex: "BillingAddress", width: 150 }
  ]
  return (
    <SearchLookupOpenButton
      searchFunc={findAccountForLookUp}
      valueField="AccountID"
      displayField="AccountName"
      columns={columns}
      meta={AccountSearchFilterMeta}
      {...props}
    />
  )
}
