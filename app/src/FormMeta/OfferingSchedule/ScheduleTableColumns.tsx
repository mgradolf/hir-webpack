import { renderDate, renderTime, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
import { getMeetings } from "~/ApiServices/Service/SectionService"

export const getSchedultTableColumns = (SectionID: number): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Day",
      dataIndex: "DayOfWeek"
    },
    {
      title: "Date",
      dataIndex: "MeetingDate",
      render: renderDate
    },
    {
      title: "Start",
      dataIndex: "StartTime",
      render: renderTime
    },
    {
      title: "End",
      dataIndex: "EndTime",
      render: renderTime
    },
    {
      title: "Instructor",
      dataIndex: "InstructorSummary"
    },
    {
      title: "Location",
      dataIndex: "LocationSummary"
    },
    {
      title: "Meeting Type",
      dataIndex: "MeetingTypeName"
    }
  ]

  return { columns, searchFunc: () => getMeetings(SectionID) }
}
