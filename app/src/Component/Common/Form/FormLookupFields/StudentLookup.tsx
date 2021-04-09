import * as React from "react"
import { LookupOpenButton } from "~/Component/Common/Modal/LookupModal/LookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/Form/common"
import { getStudentTableColumns } from "~/TableSearchMeta/Student/StudentTableColumns"
import { StudentSearchMeta } from "~/TableSearchMeta/Student/StudentSearchMeta"

export function StudentLookup(props: IGeneratedField) {
  return (
    <LookupOpenButton
      lookupModalTitle="Select Student"
      displayKey="FormattedName"
      searchFieldName="FirstName"
      meta={StudentSearchMeta as IField[]}
      metaName="StudentSearchMeta"
      {...props}
      {...getStudentTableColumns(true)}
      valueKey={props.valueKey || "StudentID"}
    />
  )
}
