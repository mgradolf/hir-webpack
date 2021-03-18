import React from "react"
import { Link } from "react-router-dom"
import { renderDate, renderEmail, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { searchEnrollment } from "~/ApiServices/BizApi/program/programEnrollmentIF"
import { ReadOutlined } from "@ant-design/icons"

export const getProgramEnrollmentTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      ...(!isModal && {
        dataIndex: "StudentID",
        render: (text: any, record: any) => (
          <Link to={`/program/${record.ProgramID}/student/${text}/enrollment`}>
            <ReadOutlined />
          </Link>
        )
      })
    },
    {
      title: "Program",
      dataIndex: "ProgramName",
      render: (text, record) => (isModal ? text : <Link to={`/program/${record.ProgramID}`}>{text}</Link>)
    },
    {
      title: "Student",
      dataIndex: "StudentName",
      render: (text, record) => (isModal ? text : <Link to={`/person/student/${record.StudentID}`}>{text}</Link>)
    },
    { title: "Status", dataIndex: "StatusName" },
    { title: "Email", dataIndex: "Email", render: renderEmail },
    { title: "Enrollment Date ", dataIndex: "EnrollmentDate", render: renderDate },
    {
      title: "Order ID",
      dataIndex: "OrderID",
      render: (text: any, record: any) => (isModal ? { text } : <Link to={`/order/${record.OrderID}`}>{text}</Link>)
    }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: searchEnrollment }
}
