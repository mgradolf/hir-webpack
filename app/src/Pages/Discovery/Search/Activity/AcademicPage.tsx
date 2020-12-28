import React from "react"
import { ActivityAcademicSearchMeta } from "~/FormMeta/ActivityAcademic/ActivityAcademicSearchMeta"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getActivityAcademicTableColumn } from "~/FormMeta/ActivityAcademic/getActivityAcademicTableColumn"

export default function AcademicLogPage() {
  return (
    <SearchPage
      title="Academic Log"
      initialFilter={{}}
      meta={ActivityAcademicSearchMeta}
      hideSearchField={false}
      tableProps={{
        ...getActivityAcademicTableColumn(false)
      }}
    ></SearchPage>
  )
}
