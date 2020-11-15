import React from "react"
import { Link } from "react-router-dom"
import { ResponsiveTable, TableColumnType } from "~/Component/Common/ResponsiveTable"

export interface ISectionRegistrationTable {
  dataSource: Array<any>
  loading: boolean
  isModal?: boolean
}

export default function SectionRegistrationTable(props: ISectionRegistrationTable) {
  const columns: TableColumnType = [
    {
      title: "ID",
      dataIndex: "StudentSerialNumber",
      render: (text: any, record: any) => (
        <Link to={`/section/${record.SectionID}/registration/${record.StudentID}s`}>{record.StudentSerialNumber}</Link>
      ),
      width: 100
    },
    {
      title: "Name",
      dataIndex: "StudentName",
      render: (text: any, record: any) => (
        <Link to={`/person/${record.StudentID}?type=Student`}>{record.StudentName}</Link>
      ),
      width: 150,
      ellipsis: true
    },
    {
      title: "Grade Scale",
      dataIndex: "GradeScaleType",
      width: 150,
      ellipsis: true
    },
    {
      title: "Transcript Credit",
      dataIndex: "TranscriptCreditType",
      width: 150,
      ellipsis: true
    },
    {
      title: "Repeat/Retake",
      dataIndex: "IsRepeat",
      width: 150,
      ellipsis: true
    },
    {
      title: "Seat Group",
      dataIndex: "SeatGroup",
      width: 150,
      ellipsis: true
    },
    {
      title: "Source",
      dataIndex: "Source",
      width: 150,
      ellipsis: true
    },
    {
      title: "Status in Section",
      dataIndex: "SectionRosterStatusCodeName",
      width: 150,
      ellipsis: true
    },
    {
      title: "Completion Date",
      dataIndex: "CompletionDate",
      width: 150,
      ellipsis: true
    },
    {
      title: "GPA Value",
      dataIndex: "GPAValue",
      width: 150,
      ellipsis: true
    },
    {
      title: "Attempted Hours",
      dataIndex: "AttemptedHours",
      width: 150,
      ellipsis: true
    },
    {
      title: "Earned Hours",
      dataIndex: "EarnedHours",
      width: 150,
      ellipsis: true
    },
    {
      title: "GPA Hours",
      dataIndex: "GPAHours",
      width: 150,
      ellipsis: true
    },
    {
      title: "CEU Hours",
      dataIndex: "CEUHours",
      width: 150,
      ellipsis: true
    },
    {
      title: "Expected Attendance",
      dataIndex: "AttendanceExpected",
      width: 150,
      ellipsis: true
    },
    {
      title: "Attendance Actual",
      dataIndex: "AttendanceActual",
      width: 150,
      ellipsis: true
    }
  ]

  const expandableRowData = (data: any, mobileView: boolean): JSX.Element => {
    const generatedValue = [
      {
        title: "Grade Scale",
        value: data["GradeScaleType"]
      },
      {
        title: "Transcript Credit",
        value: data["TranscriptCreditType"]
      },
      {
        title: "Repeat/Retake",
        value: data["IsRepeat"]
      },
      {
        title: "Seat Group",
        value: data["SeatGroup"]
      },
      {
        title: "Source",
        value: data["Source"]
      },
      {
        title: "Status in Section",
        value: data["SectionRosterStatusCodeName"]
      },
      {
        title: "Completion Date",
        value: data["CompletionDate"]
      },
      {
        title: "GPA Value",
        value: data["GPAValue"]
      },
      {
        title: "Attempted Hours",
        value: data["AttemptedHours"]
      },
      {
        title: "Earned Hours",
        value: data["EarnedHours"]
      },
      {
        title: "GPA Hours",
        value: data["GPAHours"]
      },
      {
        title: "CEU Hours",
        value: data["CEUHours"]
      },
      {
        title: "Expected Attendance",
        value: data["AttendanceExpected"]
      },
      {
        title: "Attendance Actual",
        value: data["AttendanceActual"]
      }
    ]
    return (
      <ul>
        {generatedValue.map((x, i) => {
          return (
            <>
              {x.value && (
                <li key={i}>
                  <span>{x.title} : </span>
                  <span> {x.value}</span>
                </li>
              )}
            </>
          )
        })}
      </ul>
    )
  }

  return (
    <ResponsiveTable
      columns={columns}
      dataSource={props.dataSource}
      loading={props.loading}
      bordered
      breakpoints={["md", "lg", "xl", "xxl"]}
      responsiveColumnIndices={[3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
      expandableRowRender={expandableRowData}
      rowKey="index"
      pagination={{ position: ["topLeft"], pageSize: 20 }}
      isModal={props.isModal}
    />
  )
}
