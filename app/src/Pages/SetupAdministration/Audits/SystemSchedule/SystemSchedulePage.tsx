import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { ActivitySystemScheduleSearchMeta } from "~/FormMeta/ActivitySystemSchedule/ActivitySystemScheduleSearchMeta"
import { getActivitySystemScheduleTableColumns } from "~/FormMeta/ActivitySystemSchedule/ActivitySystemScheduleTableColumns"

export default function SystemSchedulePage() {
  return (
    <SearchPage
      title="System Schedule"
      meta={ActivitySystemScheduleSearchMeta}
      hideSearchField={false}
      tableProps={{
        ...getActivitySystemScheduleTableColumns()
      }}
    ></SearchPage>
  )
}
