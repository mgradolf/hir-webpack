import React from "react"
import { Link } from "react-router-dom"
import { getStudentEnrollmentActivity } from "~/ApiServices/Service/ActivityService"
import { renderDateTime, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { ReadOutlined } from "@ant-design/icons"

export const getEnrollmentActivityLogTableColumns = (isModal = false): ITableConfigProp => {
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
    { title: "Activity Time", dataIndex: "ActivityModifiedDate", render: renderDateTime },
    { title: "Activity Type", dataIndex: "ActivityOperation", render: undefined },
    { title: "Activity By", dataIndex: "ActivityModifiedByName", render: undefined },
    {
      title: "Student",
      dataIndex: "SortName",
      render: (text: any, record: any) =>
        isModal ? { text } : <Link to={`/person/student/${record.StudentID}`}>{text}</Link>
    },
    {
      title: "Section Number",
      dataIndex: "SectionNumber",
      render: (text: any, record: any) => (isModal ? { text } : <Link to={`/section/${record.SectionID}`}>{text}</Link>)
    }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: getStudentEnrollmentActivity }
}
