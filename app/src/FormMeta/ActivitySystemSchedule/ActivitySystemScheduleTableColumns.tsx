import { renderBoolean, renderDateTime, renderDetailsLink, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
import { findSystemSchedules } from "~/ApiServices/BizApi/query/queryIf"

export const getActivitySystemScheduleTableColumns = (): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      render: (text: any, record: any) => renderDetailsLink(`/systemschedule/${record.TimerID}`)
    },
    {
      title: "Schedule Time",
      dataIndex: "NextScheduledTime",
      render: renderDateTime,
      width: 100
    },
    {
      title: "Service Name",
      dataIndex: "ServiceName"
    },
    {
      title: "Completed",
      dataIndex: "IsCompleted",
      render: renderBoolean
    }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: findSystemSchedules }
}
