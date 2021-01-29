import * as React from "react"
import { LookupOpenButton } from "~/Component/Common/Form/LookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/Form/common"
import { getStudentTableColumns } from "~/FormMeta/Student/StudentTableColumns"
import { studentSearchMeta } from "~/FormMeta/Student/StudentSearchMeta"
import { searchStudents } from "~/ApiServices/BizApi/student/studentIf"

interface IStudentLookup extends IGeneratedField {
  valueField?: string
}
export function StudentLookup(props: IStudentLookup) {
  return (
    <LookupOpenButton
      lookupModalTitle="Select Student"
      displayField="FirstName"
      meta={studentSearchMeta as IField[]}
      {...props}
      {...getStudentTableColumns(true)}
      valueField={props.valueField || "StudentID"}
      {...(props.defaultValue && {
        entityLookupFunc: () =>
          searchStudents({ StudentID: props.defaultValue }).then((x) => {
            if (x.success) return x.data[0]
            else return undefined
          })
      })}
    />
  )
}
