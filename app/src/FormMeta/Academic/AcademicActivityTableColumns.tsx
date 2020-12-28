import React from "react"
import { Link } from "react-router-dom"
import { getStudentAcademicActivity } from "~/ApiServices/Service/ActivityService"
import { renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
import { ReadOutlined } from "@ant-design/icons"

export const getAcademicActivityLogTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      ...(!isModal && {
        title: "",
        dataIndex: "",
        render: (text: any, record: any) => (
          <Link to={`/section/${record.SectionID}/registration/${record.StudentID}`}>
            <ReadOutlined />
          </Link>
        )
      })
    },
    {
      title: "Section Number",
      dataIndex: "SectionNumber",
      render: (text: any, record: any) => (isModal ? { text } : <Link to={`/section/${record.SectionID}`}>{text}</Link>)
    },
    {
      title: "Offering Name",
      dataIndex: "OfferingName",
      render: (text: any, record: any) =>
        isModal ? { text } : <Link to={`/offering/${record.OfferingID}`}>{text}</Link>
    },
    {
      title: "Student Name",
      dataIndex: "SortName",
      render: (text: any, record: any) =>
        isModal ? { text } : <Link to={`/person/student/${record.StudentID}`}>{text}</Link>
    },
    { title: "Enrollment Status", dataIndex: "EnrollmentStatus", render: undefined },
    { title: "Activity Date", dataIndex: "ActivityModifiedDate", render: renderDate },
    { title: "Activity Type", dataIndex: "ActivityOperation", render: undefined },
    { title: "Activity By", dataIndex: "ActivityModifiedByName", render: undefined },
    { title: "Grade Scale", dataIndex: "GradeScaleType", render: undefined },
    { title: "Credit Hours", dataIndex: "CreditHours", render: undefined },
    { title: "Transcript Credit", dataIndex: "TranscriptCreditType", render: undefined },
    { title: "CEUs", dataIndex: "CEUHours", render: undefined },
    { title: "Final Grade", dataIndex: "AlphaValue", render: undefined }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: getStudentAcademicActivity }
}
