import { renderBoolean, renderDateTime, renderDetailsLink, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { getSystemSchedules } from "~/ApiServices/Service/ActivityService"

export const getActivitySystemScheduleTableColumns = (): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      dataIndex: "TimerID",
      render: (text: any, record: any) => renderDetailsLink(`/system-schedule/${text}`)
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

  return { columns, searchFunc: getSystemSchedules, tableName: "ActivitySystemScheduleTableColumns" }
}
