import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { ProgramApplicationSeaarchMeta } from "~/FormMeta/Program/ProgramSearchMeta"
import { getProgramEnrollmentTableColumns } from "~/FormMeta/Program/ProgramTableColumns"

export default function ProgramEnrollment() {
  return (
    <SearchPage
      title="Manage Program Enrollments"
      meta={ProgramApplicationSeaarchMeta}
      hideSearchField={false}
      defaultFilter={{}}
      tableProps={getProgramEnrollmentTableColumns()}
    ></SearchPage>
  )
}
