import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { ActivitySystemScheduleSearchMeta } from "~/TableSearchMeta/ActivitySystemSchedule/ActivitySystemScheduleSearchMeta"
import { getActivitySystemScheduleTableColumns } from "~/TableSearchMeta/ActivitySystemSchedule/ActivitySystemScheduleTableColumns"

export default function SystemSchedulePage() {
  return (
    <SearchPage
      title="System Schedules"
      meta={ActivitySystemScheduleSearchMeta}
      metaName="ActivitySystemScheduleSearchMeta"
      hideSearchField={false}
      tableProps={{
        ...getActivitySystemScheduleTableColumns()
      }}
    ></SearchPage>
  )
}
