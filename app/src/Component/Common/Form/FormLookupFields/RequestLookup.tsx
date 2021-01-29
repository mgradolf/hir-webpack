import * as React from "react"
import { LookupOpenButton } from "~/Component/Common/Form/LookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/Form/common"
import { getRequestTableColumns } from "~/FormMeta/Request/RequestTableColumns"
import { RequestSearchMeta } from "~/FormMeta/Request/RequestSearchMeta"

export function RequestLookup(props: IGeneratedField) {
  console.log("account ", props)
  return (
    <LookupOpenButton
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
