import React from "react"
import { Link } from "react-router-dom"
import { renderDate, renderEmail, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
import { searchProgramApplication } from "~/ApiServices/BizApi/program/programApplicationIF"

export const getProgramApplicationTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    { title: "Program Code", dataIndex: "ProgramCode" },
    { title: "Program", dataIndex: "ProgramName" },
    { title: "Department", dataIndex: "DepartmentName" },
    { title: "Student", dataIndex: "StudentName" },
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
