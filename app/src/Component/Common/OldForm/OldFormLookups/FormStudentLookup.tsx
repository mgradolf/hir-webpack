import * as React from "react"
import { studentSearchMeta } from "~/FormMeta/Student/StudentSearchMeta"
import { OldFormLookupOpenButton } from "~/Component/Common/OldForm/OldFormLookupOpenButton"
import { FormInstance } from "antd/lib/form"
import { getStudentTableColumns } from "~/FormMeta/Student/StudentTableColumns"

export function FormStudentLookupButton(props: { formInstance: FormInstance; onCloseModal?: (Section: any) => void }) {
  return (
    <OldFormLookupOpenButton
      lookupModalTitle="Select Student"
      valueField="StudentID"
      displayField="FirstName"
      fieldName="StudentID"
      label="Student"
      {...getStudentTableColumns(true)}
      meta={studentSearchMeta}
      formInstance={props.formInstance}
      onCloseModal={props.onCloseModal}
    />
  )
}
