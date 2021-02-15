import * as React from "react"
import { SectionSearchMeta } from "~/TableSearchMeta/Section/SectionSearchMeta"
import { OldFormLookupOpenButton } from "~/Component/Common/OldForm/OldFormLookupOpenButton"
import { FormInstance } from "antd/lib/form"
import { getSectionTableColumns } from "~/TableSearchMeta/Section/SectionTableColumns"

export function OldFormSectionLookup(props: {
  entityLookupFunc?: () => Promise<{ [key: string]: any }>
  formInstance: FormInstance
  onCloseModal?: (Section: any) => void
}) {
  return (
    <OldFormLookupOpenButton
      lookupModalTitle="Select Section"
      valueField="SectionID"
      displayField="SectionNumber"
      fieldName="SectionID"
      label="Section"
      {...getSectionTableColumns(true)}
      meta={SectionSearchMeta}
      formInstance={props.formInstance}
      onCloseModal={props.onCloseModal}
      entityLookupFunc={props.entityLookupFunc}
    />
  )
}
