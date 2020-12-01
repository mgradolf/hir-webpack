import * as React from "react"
import { ProgramSearchMeta } from "~/FormMeta/Program/ProgramSearchMeta"
import { FormLookupOpenButton } from "~/Component/Common/Form/FormLookupOpenButton"
import { FormInstance } from "antd/lib/form"
import { getProgramTableColumns } from "~/FormMeta/Program/ProgramTableColumns"

export function FormProgramLookupButton(props: {
  formInstance: FormInstance
  zIndex?: boolean
  onCloseModal?: (Section: any) => void
}) {
  return (
    <FormLookupOpenButton
      lookupModalTitle="Select Program"
      valueField="ProgramID"
      displayField="ProgramCode"
      fieldName="ProgramID"
      label="Program"
      {...getProgramTableColumns(true)}
      meta={ProgramSearchMeta}
      formInstance={props.formInstance}
      onCloseModal={props.onCloseModal}
      zIndex={props.zIndex}
    />
  )
}
