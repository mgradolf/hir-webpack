import * as React from "react"
import { AccountSearchMeta } from "~/FormMeta/Account/AccountSearchMeta"
import { SearchLookupOpenButton } from "~/Component/Common/SearchFilters/SearchLookupOpenButton"
import { IFilterFieldComponent, IFilterGenericComponentProps } from "~/Component/Common/SearchFilters/common"
import { getAccountTableColumns } from "~/FormMeta/Account/AccountTableColumns"

export function SearchAccountLookup(props: IFilterGenericComponentProps<IFilterFieldComponent>) {
  return (
    <SearchLookupOpenButton
      lookupModalTitle="Select Account"
      valueField={props.valueField || "AccountID"}
      displayField="AccountName"
      {...getAccountTableColumns(true)}
      meta={AccountSearchMeta}
      {...props}
    />
  )
}
