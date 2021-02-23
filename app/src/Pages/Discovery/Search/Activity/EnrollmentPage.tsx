import React from "react"
import { EnrollmentsActivitySearchMeta } from "~/TableSearchMeta/EnrollmentActivity/EnrollmentActivitySearchMeta"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getEnrollmentActivityLogTableColumns } from "~/TableSearchMeta/EnrollmentActivity/EnrollmentActivityTableColumns"

export default function EnrollmentLogPage() {
  return (
    <SearchPage
      title="Enrollment Activity"
      meta={EnrollmentsActivitySearchMeta}
      hideSearchField={false}
      tableProps={{ ...getEnrollmentActivityLogTableColumns() }}
    ></SearchPage>
  )
}
