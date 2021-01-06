import React from "react"
import { Link } from "react-router-dom"
import { renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
import { searchPrograms } from "~/ApiServices/BizApi/program/programIF"

export const getProgramTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Program Code",
      dataIndex: "ProgramCode",
      render: (text: any, record: any) => (isModal ? text : <Link to={`/program/${record.ProgramID}`}>{text}</Link>)
    },
    { title: "Program Name", dataIndex: "Name" },
    { title: "Status", dataIndex: "ProgramStatusName" },
    { title: "State Date ", dataIndex: "ProgramStartDate", render: renderDate },
    { title: "End Date ", dataIndex: "ProgramEndDate", render: renderDate },
    { title: "Department", dataIndex: "DepartmentName" },
    { title: "Certificate Name", dataIndex: "CertificateName" }
  ]

  const responsiveColumnIndices: [] = []
  const expandableColumnIndices: [] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: searchPrograms }
}
