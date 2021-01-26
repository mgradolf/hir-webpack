import * as React from "react"
import { SearchLookupOpenButton } from "~/Component/Common/SearchForm/SearchLookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/SearchForm/common"
import { getRequestTableColumns } from "~/FormMeta/Request/RequestTableColumns"
import { RequestSearchMeta } from "~/FormMeta/Request/RequestSearchMeta"

export function SearchRequestLookup(props: IGeneratedField) {
  console.log("account ", props)
  return (
    <SearchLookupOpenButton
      lookupModalTitle="Select Request"
      valueField={props.valueField || "RequestID"}
      displayField={"RequestID"}
      {...getRequestTableColumns(true)}
      meta={RequestSearchMeta as IField[]}
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
