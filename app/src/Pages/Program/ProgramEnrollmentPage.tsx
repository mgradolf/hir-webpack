import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { ProgramEnrollmentSearchMeta } from "~/FormMeta/ProgramEnrollment/ProgramEnrollmentSearchMeta"
import { getProgramEnrollmentTableColumns } from "~/FormMeta/ProgramEnrollment/ProgramEnrollmentTableColumns"

export default function ProgramEnrollment() {
  return (
    <SearchPage
      title="Manage Program Enrollments"
      meta={ProgramEnrollmentSearchMeta}
      hideSearchField={false}
      defaultFilter={{}}
      tableProps={getProgramEnrollmentTableColumns()}
    ></SearchPage>
  )
}
