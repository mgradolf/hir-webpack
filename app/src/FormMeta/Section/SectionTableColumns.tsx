import { Space } from "antd"
import React from "react"
import { Link } from "react-router-dom"
import { searchSection } from "~/ApiServices/BizApi/course/courseIF"
import { renderDate, renderWeek, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { SectionMenu } from "~/Component/Section/SectionMenu"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getSectionTableColumns = (isModal = false, OfferingID?: number): ITableConfigProp => {
  const expandableColumnIndices = [7, 8, 9, 10, 11]
  const responsiveColumnIndices = [5, 6, 7, 8, 9, 10, 11]
  const columns: TableColumnType = [
    {
      title: "Section Number",
      dataIndex: "SectionNumber",
      render: (text: any, record: any) =>
        isModal ? (
          text
        ) : (
          <Link
            to={OfferingID ? `/offering/${OfferingID}/section/${record.SectionID}` : `/section/${record.SectionID}`}
          >
            {text}
          </Link>
        ),
      sorter: (a: any, b: any) => a.SectionNumber.length - b.SectionNumber.length
    },
    {
      title: "Status",
      dataIndex: "StatusCode"
    },
    {
      title: "Creation Date",
      dataIndex: "CreationDate",
      render: renderDate
    },
    {
      title: "Termination Date",
      dataIndex: "TerminationDate",
      render: renderDate
    },
    {
      title: "Offering Name",
      dataIndex: "OfferingName",
      sorter: (a: any, b: any) => a.OfferingName.length - b.OfferingName.length
    },
    {
      title: "Offering Code",
      dataIndex: "OfferingCode",
      sorter: (a: any, b: any) => a.OfferingCode.length - b.OfferingCode.length,
      render: (text: any, record: any) => (isModal ? text : <Link to={`/offering/${record.OfferingID}`}>{text}</Link>)
    },
    {
      title: "Instructors",
      dataIndex: "Faculty",
      render: (faculties: Array<any> | null) => {
        return (
          Array.isArray(faculties) &&
          faculties.map((x: any, index: number) => <div key={x.FacultyDescriptor + index}>- {x.FacultyDescriptor}</div>)
        )
      }
    },
    {
      title: "Start Date",
      dataIndex: "StartDate",
      render: renderDate
    },

    {
      title: "Meets On",
      dataIndex: "MeetsOn ",

      render: renderWeek
    },
    {
      title: "Locations",
      dataIndex: "Locations",

      render: (locations: Array<string | null> | null) => {
        return Array.isArray(locations) && locations.map((x: any, i: number) => (x ? <span key={i}>{x}</span> : null))
      }
    },
    {
      title: "Meeting Types",
      dataIndex: "MeetingTypes",
      render: (meetingTypes: Array<string | null> | null) => {
        return (
          Array.isArray(meetingTypes) && meetingTypes.map((x: any, i: number) => (x ? <span key={i}>{x}</span> : null))
        )
      }
    },
    {
      ...(!isModal && {
        title: "Action",
        render: (record: any) => (
          <Space size="middle">
            <SectionMenu section={record} />
          </Space>
        )
      })
    }
  ]

  return { columns, expandableColumnIndices, responsiveColumnIndices, searchFunc: searchSection }
}
