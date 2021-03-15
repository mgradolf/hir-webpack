import * as React from "react"
import { LookupOpenButton } from "~/Component/Common/Modal/LookupModal/LookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/Form/common"
import { getStudentTableColumns } from "~/TableSearchMeta/Student/StudentTableColumns"
import { StudentSearchMeta } from "~/TableSearchMeta/Student/StudentSearchMeta"
import { searchStudents } from "~/ApiServices/BizApi/student/studentIf"

interface IStudentLookup extends IGeneratedField {
  valueField?: string
}
export function StudentLookup(props: IStudentLookup) {
  return (
    <LookupOpenButton
      lookupModalTitle="Select Student"
      displayField="SortName"
      meta={StudentSearchMeta as IField[]}
      metaName="StudentSearchMeta"
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
