import React from "react"
import { Link } from "react-router-dom"
import { findEnrollmentHistory } from "~/ApiServices/BizApi/query/queryIf"
import { renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { ReadOutlined } from "@ant-design/icons"

export const getEnrollmentTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      ...(!isModal && {
        dataIndex: "StudentID",
        render: (text: any, record: any) => (
          <Link to={`/section/${record.SectionID}/registration/${text}`}>
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
      title: "Offering",
      dataIndex: "OfferingName",
      render: (text: any, record: any) =>
        isModal ? { text } : <Link to={`/offering/${record.OfferingID}`}>{text}</Link>
    },
    {
      title: "Student",
      dataIndex: "StudentName",
      render: (text: any, record: any) =>
        isModal ? { text } : <Link to={`/person/student/${record.StudentID}`}>{text}</Link>
    },
    { title: "Enrollment Status", dataIndex: "SectionRosterStatus", render: undefined },
    { title: "Status Date", dataIndex: "StatusDate", render: renderDate }
  ]

  return { columns, searchFunc: findEnrollmentHistory, tableName: "EnrollmentTableColumns" }
}
