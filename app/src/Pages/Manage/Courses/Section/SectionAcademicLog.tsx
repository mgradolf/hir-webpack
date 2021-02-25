import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { ActivityAcademicSearchMeta } from "~/TableSearchMeta/ActivityAcademic/ActivityAcademicSearchMeta"
import { getActivityAcademicTableColumn } from "~/TableSearchMeta/ActivityAcademic/getActivityAcademicTableColumn"
import { SearchPage } from "~/Component/Common/Page/SearchPage"

export default function AcademicLogPage(props: RouteComponentProps<{ sectionID: string }>) {
  const SectionID = Number(props.match.params.sectionID)

  return (
    <SearchPage
      title="Manage Section Academic Log"
      meta={ActivityAcademicSearchMeta}
      hideSearchField={false}
      tableProps={{
        ...getActivityAcademicTableColumn(false)
      }}
      defaultFormValue={{ SectionID }}
    />
  )
}
