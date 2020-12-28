import React from "react"
import { EnrollmentsActivitySearchMeta } from "~/FormMeta/Enrollment/EnrollmentActivitySearchMeta"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getEnrollmentActivityLogTableColumns } from "~/FormMeta/Enrollment/EnrollmentActivityTableColumns"

export default function EnrollmentLogPage() {
  return (
    <SearchPage
      title="Enrollment Activity"
      initialFilter={{}}
      meta={EnrollmentsActivitySearchMeta}
      hideSearchField={false}
      tableProps={{ ...getEnrollmentActivityLogTableColumns() }}
    ></SearchPage>
  )
}
