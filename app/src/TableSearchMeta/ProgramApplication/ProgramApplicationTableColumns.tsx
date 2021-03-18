import React from "react"
import { Link } from "react-router-dom"
import { renderDate, renderEmail, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { searchProgramApplication } from "~/ApiServices/BizApi/program/programApplicationIF"
import { ReadOutlined } from "@ant-design/icons"

export const getProgramApplicationTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      ...(!isModal && {
        dataIndex: "StudentID",
        render: (text: any, record: any) => (
          <Link to={`/program/${record.ProgramID}/student/${text}/application`}>
            <ReadOutlined />
          </Link>
        )
      })
    },
    {
      title: "Program Code",
      dataIndex: "ProgramCode",
      render: (text, record) => (isModal ? text : <Link to={`/program/${record.ProgramID}`}>{text}</Link>)
    },
    { title: "Program", dataIndex: "ProgramName" },
    { title: "Department", dataIndex: "DepartmentName" },
    {
      title: "Student",
      dataIndex: "StudentName",
      render: (text, record) => (isModal ? text : <Link to={`/person/student/${record.StudentID}`}>{text}</Link>)
    },
    { title: "Enrollment Date ", dataIndex: "EnrollmentDate", render: renderDate },
    { title: "Email", dataIndex: "Email", render: renderEmail },
    { title: "Status", dataIndex: "StatusName" },
    {
      title: "Order ID",
      dataIndex: "OrderID",
      render: (text: any, record: any) => (isModal ? { text } : <Link to={`/order/${record.OrderID}`}>{text}</Link>)
    }
  ]

  const responsiveColumnIndices: [] = []
  const expandableColumnIndices: [] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: searchProgramApplication }
}
