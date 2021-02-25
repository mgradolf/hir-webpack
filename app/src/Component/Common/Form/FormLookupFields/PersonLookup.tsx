import * as React from "react"
import { PersonSearchMeta } from "~/TableSearchMeta/Person/PersonSearchMeta"
import { LookupOpenButton } from "~/Component/Common/Modal/LookupModal/LookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/Form/common"
import { getPersonTableColumns } from "~/TableSearchMeta/Person/PersonTableColumns"
import { getEntityById } from "~/ApiServices/Service/EntityService"

export function PersonLookup(props: IGeneratedField) {
  console.log("defaultValue ", props)
  return (
    <LookupOpenButton
      lookupModalTitle="Select Person"
      displayField="SortName"
      meta={PersonSearchMeta as IField[]}
      {...props}
      {...getPersonTableColumns(true)}
      valueField={props.valueField || "PersonID"}
      {...(props.defaultValue && {
        tempentityLookupFunc: getEntityById
      })}
    />
  )
}
