import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { ProgramEnrollmentSearchMeta } from "~/TableSearchMeta/ProgramEnrollment/ProgramEnrollmentSearchMeta"
import { getProgramEnrollmentTableColumns } from "~/TableSearchMeta/ProgramEnrollment/ProgramEnrollmentTableColumns"

export default function ProgramEnrollment() {
  return (
    <SearchPage
      title="Manage Program Enrollments"
      meta={ProgramEnrollmentSearchMeta}
      helpKey="searchProgramEnrollment"
      metaName="ProgramEnrollmentSearchMeta"
      hideSearchField={false}
      defaultFormValue={{}}
      tableProps={getProgramEnrollmentTableColumns()}
    ></SearchPage>
  )
}
