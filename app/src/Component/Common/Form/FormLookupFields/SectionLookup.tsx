import * as React from "react"
import { SectionSearchMeta } from "~/FormMeta/Section/SectionSearchMeta"
import { LookupOpenButton } from "~/Component/Common/Form/LookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/Form/common"
import { getSectionTableColumns } from "~/FormMeta/Section/SectionTableColumns"
import { getEntityById } from "~/ApiServices/Service/EntityService"

export function SectionLookup(props: IGeneratedField) {
  return (
    <LookupOpenButton
      lookupModalTitle="Select Section"
      valueField="SectionID"
      displayField="SectionNumber"
      meta={SectionSearchMeta as IField[]}
      {...props}
      formInstance={props.formInstance}
      {...getSectionTableColumns(true)}
      {...(props.defaultValue && {
        entityLookupFunc: () =>
          getEntityById("Section", props.defaultValue).then((x) => {
            return x.data
          })
      })}
    />
  )
}
