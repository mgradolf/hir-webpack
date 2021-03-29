import { findOrganizationCalendar } from "~/ApiServices/BizApi/query/queryIf"
import { renderDate, renderTime, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"

export const getOrganizationCalendarTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Start Date",
      dataIndex: "StartDate",
      render: renderDate
    },
    {
      title: "Start Time",
      dataIndex: "StartDate",
      render: renderTime
    },
    {
      title: "End Date",
      dataIndex: "EndDate",
      render: renderDate
    },
    {
      title: "End Time",
      dataIndex: "EndDate",
      render: renderTime
    },
    {
      title: "Name",
      dataIndex: "Name"
    },
    {
      title: "Description",
      dataIndex: "Description"
    }
  ]

  return { columns, searchFunc: findOrganizationCalendar, tableName: "OrganizationCalendarTableColumns" }
}
