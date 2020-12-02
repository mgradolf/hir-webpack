import React from "react"
import { Link } from "react-router-dom"
import { renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
import { searchPrograms } from "~/ApiServices/BizApi/program/programIF"
import { searchProgramApplication } from "~/ApiServices/BizApi/program/programApplicationIF"
import { searchEnrollment } from "~/ApiServices/BizApi/program/programEnrollmentIF"

export const getProgramTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    { title: "Program Code", dataIndex: "ProgramCode" },
    { title: "Program Name", dataIndex: "Name" },
    { title: "Status", dataIndex: "ProgramStatusName" },
    { title: "State Date ", dataIndex: "ProgramStartDate", render: renderDate },
    { title: "End Date ", dataIndex: "ProgramEndDate", render: renderDate },
    { title: "Department", dataIndex: "DepartmentName" },
    { title: "Certificate Name", dataIndex: "CertificateName" }
  ]

  const responsiveColumnIndices = [1, 3, 4, 5, 6]
  const expandableColumnIndices = [6, 7]
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: searchPrograms }
}

export const getProgramApplicationTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    { title: "Program Code", dataIndex: "ProgramCode" },
    { title: "Program Name", dataIndex: "ProgramName" },
    { title: "Department", dataIndex: "DepartmentName" },
    { title: "Student Name", dataIndex: "StudentName" },
    { title: "Enrollment Date ", dataIndex: "EnrollmentDate", render: renderDate },
    { title: "Email", dataIndex: "Email" },
    { title: "Status", dataIndex: "StatusName" },
    {
      title: "Order ID",
      dataIndex: "OrderID",
      render: (text: any, record: any) => (isModal ? { text } : <Link to={`/order/${record.OrderID}`}>{text}</Link>)
    }
  ]

  const responsiveColumnIndices = [1, 3, 4, 5, 6]
  const expandableColumnIndices = [3, 6]
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: searchProgramApplication }
}

export const getProgramEnrollmentTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    { title: "Program Code", dataIndex: "ProgramCode" },
    { title: "Program Name", dataIndex: "ProgramName" },
    { title: "Department", dataIndex: "DepartmentName" },
    { title: "Student Name", dataIndex: "StudentName" },
    { title: "Enrollment Date ", dataIndex: "EnrollmentDate", render: renderDate },
    { title: "Email", dataIndex: "Email" },
    { title: "Status", dataIndex: "StatusName" },
    {
      title: "Order ID",
      dataIndex: "OrderID",
      render: (text: any, record: any) => (isModal ? { text } : <Link to={`/order/${record.OrderID}`}>{text}</Link>)
    }
  ]

  const responsiveColumnIndices = [1, 3, 4, 5, 6]
  const expandableColumnIndices = [3, 6]
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: searchEnrollment }
}
