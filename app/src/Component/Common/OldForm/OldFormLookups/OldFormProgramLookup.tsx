import * as React from "react"
import { ProgramSearchMeta } from "~/TableSearchMeta/Program/ProgramSearchMeta"
import { OldFormLookupOpenButton } from "~/Component/Common/OldForm/OldFormLookupOpenButton"
import { FormInstance } from "antd/lib/form"
import { getProgramTableColumns } from "~/TableSearchMeta/Program/ProgramTableColumns"

export function OldFormProgramLookup(props: {
  formInstance: FormInstance
  zIndex?: boolean
  onCloseModal?: (Section: any) => void
}) {
  return (
    <OldFormLookupOpenButton
      lookupModalTitle="Select Program"
      valueKey="ProgramID"
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
