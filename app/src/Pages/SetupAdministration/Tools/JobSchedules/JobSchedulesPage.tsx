import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getJobScheduleTableColumns } from "~/FormMeta/JobSchedules/JobScheduleTableColumns"

export default function JobSchedulesPage() {
  return (
    <SearchPage
      title="Job Schedules"
      defaultFilter={{}}
      tableProps={{
        ...getJobScheduleTableColumns()
      }}
    ></SearchPage>
  )
}
