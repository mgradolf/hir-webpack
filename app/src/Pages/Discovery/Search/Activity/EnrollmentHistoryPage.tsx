import React from "react"
import { EnrollmentSearchMeta } from "~/TableSearchMeta/Enrollment/EnrollmentSearchMeta"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getEnrollmentTableColumns } from "~/TableSearchMeta/Enrollment/EnrollmentTableColumns"

export default function EnrollmentHistoryPage() {
  return (
    <SearchPage
      title="Enrollment History"
      meta={EnrollmentSearchMeta}
      hideSearchField={false}
      tableProps={{ ...getEnrollmentTableColumns() }}
    ></SearchPage>
  )
}
