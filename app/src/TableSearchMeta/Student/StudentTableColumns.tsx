import React from "react"
import { Link } from "react-router-dom"
import { renderDate, renderEmail, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { searchStudents } from "~/ApiServices/BizApi/student/studentIf"

export const getStudentTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Name",
      render: (text: any, record: any) =>
        !isModal ? (
          <Link to={`/person/student/${record.StudentID}`}>{`${record.SortName}`}</Link>
        ) : (
          <span>{`${record.SortName}`}</span>
        )
    },
    { title: "Email", dataIndex: "EmailAddress", render: renderEmail },
    { title: "Telephone", dataIndex: "TelephoneNumber" },
    { title: "BirthDate ", dataIndex: "Birthday", render: renderDate },
    { title: "City", dataIndex: "Locality" },
    { title: "ERP ID", dataIndex: "ERPID" }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: searchStudents }
}
