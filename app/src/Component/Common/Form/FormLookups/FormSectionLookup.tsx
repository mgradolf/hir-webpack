import * as React from "react"
import { SectionSearchMeta } from "~/FormMeta/Section/SectionSearchMeta"
import { FormLookupOpenButton } from "~/Component/Common/Form/FormLookupOpenButton"
import { FormInstance } from "antd/lib/form"
import { getSectionTableColumns } from "~/FormMeta/Section/SectionTableColumns"

export function FormSectionLookupButton(props: { formInstance: FormInstance; onCloseModal?: (Section: any) => void }) {
  return (
    <FormLookupOpenButton
      lookupModalTitle="Select Section"
      valueField="SectionID"
      displayField="SectionNumber"
      fieldName="SectionID"
      label="Section"
      {...getSectionTableColumns(true)}
      meta={SectionSearchMeta}
      formInstance={props.formInstance}
      onCloseModal={props.onCloseModal}
    />
  )
}
