import * as React from "react"
import programMeta from "~/FormMeta/Program/ProgramSearchFilterMeta"
import { FormLookupOpenButton } from "~/Component/Common/Form/FormLookupOpenButton"
import { FormInstance } from "antd/lib/form"
import { getProgramTableColumns } from "~/FormMeta/Program/ProgramTableColumns"

export function FormProgramLookupButton(props: { formInstance: FormInstance; onCloseModal?: (Section: any) => void }) {
  return (
    <FormLookupOpenButton
      lookupModalTitle="Select Program"
      valueField="ProgramID"
      displayField="ProgramCode"
      fieldName="ProgramID"
      label="Program"
      {...getProgramTableColumns(true)}
      meta={programMeta}
      formInstance={props.formInstance}
      onCloseModal={props.onCloseModal}
    />
  )
}
