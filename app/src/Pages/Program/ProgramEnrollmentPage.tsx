import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { ProgramApplicationMeta } from "~/FormMeta/Program/ProgramSearchFilterMeta"
import { getProgramEnrollmentTableColumns } from "~/FormMeta/Program/ProgramTableColumns"

export default function ProgramEnrollment() {
  return (
    <SearchPage
      title="Manage Program Enrollments"
      meta={ProgramApplicationMeta}
      hideSearchField={false}
      defaultFilter={{}}
      tableProps={getProgramEnrollmentTableColumns()}
    ></SearchPage>
  )
}
