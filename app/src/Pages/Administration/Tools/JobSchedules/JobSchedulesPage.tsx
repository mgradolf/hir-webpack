import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getJobScheduleTableColumns } from "~/TableSearchMeta/JobSchedules/JobScheduleTableColumns"

export default function JobSchedulesPage() {
  return (
    <SearchPage
      title="Job Schedules"
      helpKey="administrationToolsJobSchedule"
      defaultFormValue={{}}
      tableProps={{
        ...getJobScheduleTableColumns()
      }}
    ></SearchPage>
  )
}
