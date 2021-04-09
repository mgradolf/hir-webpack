import * as React from "react"
import { LookupOpenButton } from "~/Component/Common/Modal/LookupModal/LookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/Form/common"
import { ProgramEnrollmentSearchMeta } from "~/TableSearchMeta/ProgramEnrollment/ProgramEnrollmentSearchMeta"
import { getProgramEnrollmentTableColumnsForLookup } from "~/TableSearchMeta/ProgramEnrollment/ProgramEnrollmentTableColumnsForLookup"

export function ProgramEnrollmentLookup(props: IGeneratedField) {
  return (
    <LookupOpenButton
      lookupModalTitle="Select Program Enrollment"
      displayKey="ProgramCode"
      placeholder="Search By Program Enrollment Code"
      searchFieldName="programCode"
      meta={ProgramEnrollmentSearchMeta as IField[]}
      metaName="ProgramEnrollmentSearchMeta"
      {...props}
      {...getProgramEnrollmentTableColumnsForLookup(true)}
      valueKey={props.valueKey || "ProgramEnrollmentID"}
    />
  )
}
