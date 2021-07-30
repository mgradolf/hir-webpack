import * as React from "react"
import { LookupOpenButton } from "~/Component/Common/Modal/LookupModal/LookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/Form/common"
import { InstructorSearchMeta } from "~/TableSearchMeta/Instructor/InstructorSearchMeta"
import { getInstructorTableColumns } from "~/TableSearchMeta/Instructor/InstructorTableColumns"

export function InstructorLookupButton(props: IGeneratedField) {
  return (
    <LookupOpenButton
      lookupModalTitle="Select Instructor"
      valueKey="FacultyID"
      displayKey="FormattedName"
      searchFieldName="FormattedName"
      placeholder="Search By Full Name"
      meta={InstructorSearchMeta as IField[]}
      metaName="InstructorSearchMeta"
      {...props}
      {...getInstructorTableColumns(true)}
    />
  )
}
