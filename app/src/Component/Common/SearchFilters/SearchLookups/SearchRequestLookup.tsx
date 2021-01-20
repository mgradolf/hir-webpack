import * as React from "react"
import { SearchLookupOpenButton } from "~/Component/Common/SearchFilters/SearchLookupOpenButton"
import { IFilterFieldComponent, IFilterGenericComponentProps } from "~/Component/Common/SearchFilters/common"
import { getRequestTableColumns } from "~/FormMeta/Request/RequestTableColumns"
import { RequestSearchMeta } from "~/FormMeta/Request/RequestSearchMeta"

export function SearchRequestLookup(props: IFilterGenericComponentProps<IFilterFieldComponent>) {
  console.log("account ", props)
  return (
    <SearchLookupOpenButton
      lookupModalTitle="Select Request"
      valueField={props.valueField || "RequestID"}
      displayField={"RequestID"}
      {...getRequestTableColumns(true)}
      meta={RequestSearchMeta}
      {...props}
      // {...(props.defaultValue && {
      //   entityLookupFunc: () =>
      //     getEntityById("Account", props.defaultValue).then((x) => {
      //       if (x.success) x.data["AccountName"] = x.data.Name
      //       console.log(x)
      //       return x.data
      //     })
      // })}
    />
  )
}
