import { findJobSchedules } from "~/ApiServices/BizApi/jobScheduler/jobSchedulerIF"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"

export const getJobScheduleTableColumns = (): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Job Name",
      dataIndex: "ScheduleName"
    },
    {
      title: "Service",
      dataIndex: "ServiceName"
    },
    {
      title: "Frequency",
      dataIndex: "FrequencyDescriptor"
    },
    {
      title: "Next Run",
      dataIndex: "NextRun"
    }
  ]

  return { columns, searchFunc: findJobSchedules, tableName: "JobScheduleTableColumns" }
}
