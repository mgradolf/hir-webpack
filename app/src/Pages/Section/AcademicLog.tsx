import React, { useState } from "react"
import { Link, RouteComponentProps } from "react-router-dom"
import { getStudentAcademicActivity } from "~/ApiServices/Service/ActivityService"
import AcademicLogSearch from "~/Component/Common/SearchFilters"
import { renderBoolean, renderDateTime, ResponsiveTable, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { getSectionAcademicActivitySearchMeta } from "~/FormMeta/SectionActivity/SectionAcademicActivitySearchMeta"

export default function AcademicLogPage(props: RouteComponentProps<{ sectionID: string }>) {
  const SectionID = Number(props.match.params.sectionID)
  const [searchParams, setSearchParams] = useState<{ [key: string]: any }>({ SectionIDs: [SectionID] })
  const columns: TableColumnType = [
    {
      title: "User ID",
      dataIndex: "UserID",
      width: 100
    },
    {
      title: "User Name",
      dataIndex: "ActivityModifiedByName",
      width: 100
    },
    {
      title: "Activity Date",
      dataIndex: "ActivityDate",
      width: 100
    },
    {
      title: "Activity Type",
      dataIndex: "ActivityType",
      width: 100
    },
    {
      title: "Student ID",
      dataIndex: "StudentSerialNum",
      render: (text: any, record: any) => <Link to={`/person/student/${record.StudentID}`}>{text}</Link>,
      width: 100
    },
    {
      title: "Student Name",
      dataIndex: "StudentName",
      render: (text: any, record: any) => <Link to={`/person/student/${record.StudentID}`}>{text}</Link>,
      width: 100
    },
    {
      title: "Section Number",
      dataIndex: "SectionNumber",
      render: (text: any, record: any) => <Link to={`/section/${record.SectionID}`}>{text}</Link>,
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
      dataIndex: "ProgramID",
      width: 100
    },
    {
      title: "Transcript Credit Type",
      dataIndex: "TranscriptCreditType",
      width: 100
    },
    {
      title: "Grade Scale Type",
      dataIndex: "GradeScaleType",
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
      width: 100
    },
    {
      title: "Termination Time",
      dataIndex: "TerminationTime",
      width: 100
    },
    {
      title: "Completion On Termination",
      dataIndex: "CompleteOnTermination",
      render: renderBoolean,
      width: 100
    }
  ]

  return (
    <div className="site-layout-content">
      <AcademicLogSearch
        meta={getSectionAcademicActivitySearchMeta}
        title="Find Student Academic Activity"
        visible={true}
        isCheckeble={false}
        hideFilters={() => console.log("s")}
        onApplyChanges={(newValues, count) => {
          const Params: any = newValues
          Params.SectionIDs = [SectionID]
          setSearchParams(Params)
          console.log(newValues)
        }}
        initialFilter={{}}
        isModalView
      />
      <ResponsiveTable
        columns={columns}
        searchFunc={getStudentAcademicActivity}
        expandableColumnIndices={[5]}
        responsiveColumnIndices={[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]}
        searchParams={searchParams}
        rowKey="ActivityID"
      />
    </div>
  )
}
