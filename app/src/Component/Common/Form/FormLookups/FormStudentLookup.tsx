import * as React from "react"
import { studentSearchMeta } from "~/FormMeta/Student/StudentSearchMeta"
import { FormLookupOpenButton } from "~/Component/Common/Form/FormLookupOpenButton"
import { FormInstance } from "antd/lib/form"
import { getStudentTableColumns } from "~/FormMeta/Student/StudentTableColumns"

export function FormStudentLookupButton(props: { formInstance: FormInstance; onCloseModal?: (Section: any) => void }) {
  return (
    <FormLookupOpenButton
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
