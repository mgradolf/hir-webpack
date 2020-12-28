import React from "react"
import { ActivityEnrollmentSearchMeta } from "~/FormMeta/ActivityEnrollment/ActivityEnrollmentSearchMeta"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getActivityEnrollmentTableColumns } from "~/FormMeta/ActivityEnrollment/ActivityEnrollmentTableColumns"

export default function AcademicLogPage() {
  return (
    <SearchPage
      title="Enrollment Activity"
      initialFilter={{}}
      meta={ActivityEnrollmentSearchMeta}
      hideSearchField={false}
      tableProps={{ ...getActivityEnrollmentTableColumns() }}
    ></SearchPage>
  )
}
