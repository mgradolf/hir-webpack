import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { ActivityEnrollmentSearchMeta } from "~/TableSearchMeta/ActivityEnrollment/ActivityEnrollmentSearchMeta"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getActivityEnrollmentTableColumns } from "~/TableSearchMeta/ActivityEnrollment/ActivityEnrollmentTableColumns"

export default function EnrollmentLogPage(props: RouteComponentProps<{ sectionID: string }>) {
  const SectionID = Number(props.match.params.sectionID)
  return (
    <SearchPage
      title="Manage nrollment Activity"
      meta={ActivityEnrollmentSearchMeta}
      hideSearchField={false}
      defaultFormValue={{ SectionID }}
      tableProps={{ ...getActivityEnrollmentTableColumns() }}
    ></SearchPage>
  )
}
