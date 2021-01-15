import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { ActivityEnrollmentSearchMeta } from "~/FormMeta/ActivityEnrollment/ActivityEnrollmentSearchMeta"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getActivityEnrollmentTableColumns } from "~/FormMeta/ActivityEnrollment/ActivityEnrollmentTableColumns"

export default function EnrollmentLogPage(props: RouteComponentProps<{ sectionID: string }>) {
  const SectionID = Number(props.match.params.sectionID)
  return (
    <SearchPage
      title="Manage nrollment Activity"
      initialFilter={{}}
      meta={ActivityEnrollmentSearchMeta}
      hideSearchField={false}
      defaultFilter={{ SectionID }}
      tableProps={{ ...getActivityEnrollmentTableColumns() }}
    ></SearchPage>
  )
}
