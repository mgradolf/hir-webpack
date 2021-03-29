import React from "react"
import { Link } from "react-router-dom"
import { getMeetings } from "~/ApiServices/Service/SectionService"
import { renderDate, renderTime, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"

export const getSectionScheduleTableColumns = (): ITableConfigProp => {
  const columns: TableColumnType = [
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
      dataIndex: "LocationSummary",
      render: (text: any, record: any) =>
        record.Locations != null && record.Locations[0].RoomID != null ? (
          <Link to={`/room/${record.Locations[0].RoomID}`}>{text}</Link>
        ) : record.Locations[0].BuildingID != null ? (
          <Link to={`/building/${record.Locations[0].BuildingID}`}>{text}</Link>
        ) : record.Locations[0].SiteID != null ? (
          <Link to={`/site/${record.Locations[0].SiteID}`}>{text}</Link>
        ) : (
          ""
        )
    },
    {
      title: "Instructor",
      dataIndex: "InstructorSummary",
      render: (text: any, record: any) => (
        <ul>
          {record.Instructors.map((x: any) => {
            return (
              <li>
                <Link to={`/person/faculty/${x.FacultyID}`}>{x.Instructor}</Link>
              </li>
            )
          })}
        </ul>
      )
    }
  ]

  return { columns, searchFunc: getMeetings, tableName: "ScheduleTableColumns" }
}
