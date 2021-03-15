import * as React from "react"
import { LookupOpenButton } from "~/Component/Common/Modal/LookupModal/LookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/Form/common"
import { getRequestTableColumns } from "~/TableSearchMeta/Request/RequestTableColumns"
import { RequestSearchMeta } from "~/TableSearchMeta/Request/RequestSearchMeta"

export function RequestLookup(props: IGeneratedField) {
  console.log("account ", props)
  return (
    <LookupOpenButton
      lookupModalTitle="Select Request"
      valueField={props.valueField || "RequestID"}
      displayField={"RequestID"}
      {...getRequestTableColumns(true)}
      meta={RequestSearchMeta as IField[]}
      metaName="RequestSearchMeta"
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
