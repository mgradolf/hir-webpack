import React from "react"
import { getStudentAcademicActivity } from "~/ApiServices/Service/ActivityService"
import { getSectionAcademicActivitySearchMeta } from "~/FormMeta/SectionActivity/SectionAcademicActivitySearchMeta"
import { renderDateTime, TableColumnType } from "~/Component/Common/ResponsiveTable"
import SearchPage from "~/Component/Common/Page/SearchPage"
import { Link } from "react-router-dom"

export default function AcademicLogPage() {
  const columns: TableColumnType = [
    {
      title: "User ID",
      dataIndex: "ActivityModifiedByUID",
      width: 100
    },
    {
      title: "User Name",
      dataIndex: "ActivityModifiedByName",
      width: 100
    },
    {
      title: "Activity Date",
      dataIndex: "ActivityModifiedDate",
      render: renderDateTime,
      width: 100
    },
    {
      title: "Activity Type",
      dataIndex: "ActivityOperation",
      width: 100
    },
    {
      title: "Student ID",
      dataIndex: "StudentSerialNum",
      render: (text: any, record: any) => {
        return <Link to={`/person/student/${record.StudentID}`}>{text}</Link>
      },
      width: 100
    },
    {
      title: "Student Name",
      dataIndex: "SortName",
      render: (text: any, record: any) => {
        return <Link to={`/person/student/${record.StudentID}`}>{text}</Link>
      },
      width: 100
    },
    {
      title: "Section Number",
      dataIndex: "SectionNumber",
      render: (text: any, record: any) => {
        return <Link to={`/section/${record.SectionNumber}?type=Student`}>{text}</Link>
      },
      width: 100
    },
    {
      title: "Section Nummber",
      dataIndex: "SectionNumber",
      render: (text: any, record: any) => {
        return <Link to={`/section/${record.SectionID}`}>{text}</Link>
      },
      width: 100
    },
    {
      title: "Section Creation Date",
      dataIndex: "SectionCreationDate",
      render: renderDateTime,
      width: 100
    },
    {
      title: "Section Termination Date",
      dataIndex: "SectionTerminationDate",
      render: renderDateTime,
      width: 100
    },
    {
      title: "Program ID",
      dataIndex: "ProgramCode",
      width: 100
    },
    {
      title: "Transcript Credit Type ID",
      dataIndex: "TranscriptCreditTypeID",
      width: 100
    },
    {
      title: "Grade Scale Type ID",
      dataIndex: "GradeScaleTypeID",
      width: 100
    },
    {
      title: "Grade Score Definition ID",
      dataIndex: "GradeScoreDefinitionID",
      width: 100
    },
    {
      title: "Attempted Hours",
      dataIndex: "AttemptedHours",
      width: 100
    },
    {
      title: "Earned Hours",
      dataIndex: "EarnedHours",
      width: 100
    },
    {
      title: "GPA Hours",
      dataIndex: "GPAHours",
      width: 100
    },
    {
      title: "GPA Value",
      dataIndex: "GPAValue",
      width: 100
    },
    {
      title: "CEU Hours",
      dataIndex: "CEUHours",
      width: 100
    },
    {
      title: "Is Repeat",
      dataIndex: "IsRepeat",
      width: 100
    },
    {
      title: "Creation Time",
      dataIndex: "CreationTime",
      render: renderDateTime,
      width: 100
    },
    {
      title: "Termination Time",
      dataIndex: "TerminationTime",
      render: renderDateTime,
      width: 100
    },
    {
      title: "Completion On Termination",
      dataIndex: "CompleteOnTermination",
      width: 100
    }
  ]
  return (
    <SearchPage
      title="Academic Log"
      initialFilter={{}}
      meta={getSectionAcademicActivitySearchMeta}
      hideSearchField={false}
      tableProps={{
        columns: columns,
        searchFunc: getStudentAcademicActivity,
        expandableColumnIndices: [5],
        responsiveColumnIndices: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
        rowKey: "ActivityID",
        pagination: { position: ["topLeft"], pageSize: 20 }
      }}
    ></SearchPage>
  )
}
