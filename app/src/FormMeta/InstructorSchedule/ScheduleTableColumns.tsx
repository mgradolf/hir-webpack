import React from "react"
import { Link } from "react-router-dom"
import { getMeetings } from "~/ApiServices/Service/SectionService"
import { renderDate, renderTime, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getInstructorScheduleTableColumns = (): ITableConfigProp => {
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
      title: "Section Number",
      dataIndex: "SectionNumber",
      render: (text: any, record: any) => <Link to={`/section/${record.SectionID}`}>{text}</Link>
    },
    {
      title: "Offering Name",
      dataIndex: "OfferingName",
      render: (text: any, record: any) => <Link to={`/offering/${record.OfferingID}`}>{text}</Link>
    },
    {
      title: "Location",
      dataIndex: "LocationSummary",
      render: (text: any, record: any) => (
        record.Locations != null && record.Locations[0].RoomID != null ? <Link to={`/room/${record.Locations[0].RoomID}`}>{text}</Link>
          : record.Locations[0].BuildingID != null ? <Link to={`/building/${record.Locations[0].BuildingID}`}>{text}</Link>
            : record.Locations[0].SiteID != null ? <Link to={`/site/${record.Locations[0].SiteID}`}>{text}</Link> : ""
      )
    },
    {
      title: "Instructor",
      dataIndex: "InstructorSummary",
      render: (text: any, record: any) => <ul>
        {record.Instructors.map((x: any) => {
          return <li><Link to={`/person/faculty/${x.FacultyID}`}>{x.Instructor}</Link></li>
        })}
      </ul>
    }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: getMeetings }
}
