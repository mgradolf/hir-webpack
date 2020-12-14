import { getMeetings } from "~/ApiServices/Service/SectionService"
import { renderDate, renderTime, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getSectionScheduleTableColumns = (sectionID: number): ITableConfigProp => {
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
      title: "Meeting Type",
      dataIndex: "MeetingTypeName"
    },
    {
      title: "Location",
      dataIndex: "LocationSummary"
    },
    {
      title: "Instructor",
      dataIndex: "InstructorSummary"
    },
    {
      title: "Notes",
      dataIndex: "InformationSummary"
    }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: () => getMeetings(sectionID) }
}
