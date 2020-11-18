import * as React from "react"
import PersonSearchFilterMeta from "~/FormMeta/Person/PersonSearchFilterMeta"
import { FormLookupOpenButton } from "~/Component/Common/Form/FormLookupOpenButton"
import { FormInstance } from "antd/lib/form"
import { getSectionTableColumns } from "~/FormMeta/Section/SectionTableColumns"

export function FormSectionLookupButton(props: { formInstance: FormInstance; onCloseModal?: (Section: any) => void }) {
  return (
    <FormLookupOpenButton
      lookupModalTitle="Select Section"
      valueField="SectionID"
      displayField="SortName"
      fieldName="SectionID"
      label="Section"
      formInstance={props.formInstance}
      {...getSectionTableColumns(true)}
      meta={PersonSearchFilterMeta}
      onCloseModal={props.onCloseModal}
    />
  )
}
