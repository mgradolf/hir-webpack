import React from "react"
import { Link } from "react-router-dom"
import { getStudentAcademicActivity } from "~/ApiServices/Service/ActivityService"
import { renderBoolean, renderDateTime, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"

export const getActivityAcademicTableColumn = (isModal = false): ITableConfigProp => {
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
      title: "Student",
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
      dataIndex: "ProgramID",
      width: 100
    },
    {
      title: "Transcript Credit Type",
      dataIndex: "TranscriptCreditTypeID",
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
      title: "Complete On Termination",
      dataIndex: "CompleteOnTermination",
      render: renderBoolean,
      width: 100
    }
  ]
  return { columns, searchFunc: getStudentAcademicActivity, tableName: "getActivityAcademicTableColumn" }
}
