import React from "react"
import { Link } from "react-router-dom"
import { getMeetings } from "~/ApiServices/Service/SectionService"
import { renderDate, renderTime, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getSectionScheduleTableColumns = (): ITableConfigProp => {
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
      dataIndex: "InstructorSummary",
      render: (text: any, record: any) => <Link to={`/person/faculty/${record.FacultyID}`}>{text}</Link>
    },
    {
      title: "Notes",
      dataIndex: "InformationSummary"
    }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: getMeetings }
}
