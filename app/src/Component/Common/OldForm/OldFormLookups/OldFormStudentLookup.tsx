import * as React from "react"
import { StudentSearchMeta } from "~/TableSearchMeta/Student/StudentSearchMeta"
import { OldFormLookupOpenButton } from "~/Component/Common/OldForm/OldFormLookupOpenButton"
import { FormInstance } from "antd/lib/form"
import { getStudentTableColumns } from "~/TableSearchMeta/Student/StudentTableColumns"

export function OldFormStudentLookup(props: { formInstance: FormInstance; onCloseModal?: (Section: any) => void }) {
  return (
    <OldFormLookupOpenButton
      lookupModalTitle="Select Student"
      valueField="StudentID"
      displayField="FirstName"
      fieldName="StudentID"
      label="Student"
      {...getStudentTableColumns(true)}
      meta={StudentSearchMeta}
      formInstance={props.formInstance}
      onCloseModal={props.onCloseModal}
    />
  )
}
