import * as React from "react"
import { AccountSearchMeta } from "~/FormMeta/Account/AccountSearchMeta"
import { SearchLookupOpenButton } from "~/Component/Common/SearchFilters/SearchLookupOpenButton"
import { IFilterFieldComponent, IFilterGenericComponentProps } from "~/Component/Common/SearchFilters/common"
import { getAccountTableColumns } from "~/FormMeta/Account/AccountTableColumns"
import { getEntityById } from "~/ApiServices/Service/EntityService"

export function SearchAccountLookup(props: IFilterGenericComponentProps<IFilterFieldComponent>) {
  console.log("account ", props)
  return (
    <SearchLookupOpenButton
      lookupModalTitle="Select Account"
      valueField={props.valueField || "AccountID"}
      displayField={"AccountName"}
      {...getAccountTableColumns(true)}
      meta={AccountSearchMeta}
      {...props}
      {...(props.defaultValue && {
        entityLookupFunc: () =>
          getEntityById("Account", props.defaultValue).then((x) => {
            if (x.success) x.data["AccountName"] = x.data.Name
            console.log(x)
            return x.data
          })
      })}
    />
  )
}
