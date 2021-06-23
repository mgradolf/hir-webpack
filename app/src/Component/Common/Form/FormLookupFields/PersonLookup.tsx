import * as React from "react"
import { PersonSearchMeta } from "~/TableSearchMeta/Person/PersonSearchMeta"
import { LookupOpenButton } from "~/Component/Common/Modal/LookupModal/LookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/Form/common"
import { getPersonTableColumns } from "~/TableSearchMeta/Person/PersonTableColumns"

export function PersonLookup(props: IGeneratedField) {
  return (
    <LookupOpenButton
      lookupModalTitle="Select Person"
      displayKey="SortName"
      searchFieldName="FirstName"
      meta={PersonSearchMeta as IField[]}
      help={props.help}
      metaName="PersonSearchMeta"
      {...props}
      {...getPersonTableColumns(true)}
      valueKey={props.valueKey || "PersonID"}
    />
  )
}
