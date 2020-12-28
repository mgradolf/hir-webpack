import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { ActivityAcademicSearchMeta } from "~/FormMeta/ActivityAcademic/ActivityAcademicSearchMeta"
import { getActivityAcademicTableColumn } from "~/FormMeta/ActivityAcademic/getActivityAcademicTableColumn"
import { SearchPage } from "~/Component/Common/Page/SearchPage"

export default function AcademicLogPage(props: RouteComponentProps<{ sectionID: string }>) {
  const SectionID = Number(props.match.params.sectionID)

  return (
    <SearchPage
      title="Section Academic Log"
      initialFilter={{}}
      meta={ActivityAcademicSearchMeta}
      hideSearchField={false}
      tableProps={{
        ...getActivityAcademicTableColumn(false)
      }}
      defaultFilter={{ SectionID }}
    />
  )
}
