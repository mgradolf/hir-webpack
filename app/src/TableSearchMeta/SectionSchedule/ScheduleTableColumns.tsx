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
      render: (text: any, record: any) => {
        if (record && record.Locations !== null && Array.isArray(record.Locations) && record.Locations.length > 0) {
          if (record.Locations[0].RoomID !== null) return <Link to={`/room/${record.Locations[0].RoomID}`}>{text}</Link>
          if (record.Locations[0].BuildingID !== null)
            return <Link to={`/building/${record.Locations[0].BuildingID}`}>{text}</Link>
          if (record.Locations[0].SiteID !== null) return <Link to={`/site/${record.Locations[0].SiteID}`}>{text}</Link>
        } else return null
      }
    },
    {
      title: "Instructor",
      dataIndex: "InstructorSummary",
      render: (text: any, record: any) => (
        <ul>
          {Array.isArray(record.Instructors) &&
            record.Instructors.map((x: any) => {
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
