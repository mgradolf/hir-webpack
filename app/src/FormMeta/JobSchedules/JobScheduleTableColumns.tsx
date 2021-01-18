import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
import { findJobSchedules } from "~/ApiServices/BizApi/query/queryIf"

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

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: findJobSchedules }
}
