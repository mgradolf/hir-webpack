import React from "react"
import { EnrollmentSearchMeta } from "~/FormMeta/Enrollment/EnrollmentSearchMeta"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getEnrollmentTableColumns } from "~/FormMeta/Enrollment/EnrollmentTableColumns"

export default function EnrollmentHistoryPage() {
  return (
    <SearchPage
      title="Enrollment History"
      initialFormValue={{}}
      meta={EnrollmentSearchMeta}
      hideSearchField={false}
      tableProps={{ ...getEnrollmentTableColumns() }}
    ></SearchPage>
  )
}
