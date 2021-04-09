import * as React from "react"
import { LookupOpenButton } from "~/Component/Common/Modal/LookupModal/LookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/Form/common"
import { getRequestTableColumns } from "~/TableSearchMeta/Request/RequestTableColumns"
import { RequestSearchMeta } from "~/TableSearchMeta/Request/RequestSearchMeta"

export function RequestLookup(props: IGeneratedField) {
  return (
    <LookupOpenButton
      lookupModalTitle="Select Request"
      valueKey={props.valueKey || "RequestID"}
      displayKey={"RequestID"}
      {...getRequestTableColumns(true)}
      meta={RequestSearchMeta as IField[]}
      metaName="RequestSearchMeta"
      {...props}
    />
  )
}
