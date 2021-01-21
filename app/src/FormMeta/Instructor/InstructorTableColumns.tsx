import React from "react"
import { Link } from "react-router-dom"
import { searchFaculties } from "~/ApiServices/BizApi/faculty/facultyIf"

import { renderEmail, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getInstructorTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Name",
      dataIndex: "FacultySerialNum",
      render: (text: any, record: any) => <Link to={`/person/faculty/${record.FacultyID}`}>{record.SortName}</Link>,
      sorter: (a: any, b: any) => a.FacultySerialNum.length - b.FacultySerialNum.length
    },
    { title: "Email", dataIndex: "EmailAddress", render: renderEmail },
    { title: "Telephone", dataIndex: "TelephoneNumber" },
    { title: "Organization", dataIndex: "OrganizationName" },
    { title: "Status", dataIndex: "Status" },
    { title: "Instructor Type", dataIndex: "InstructorType" }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: searchFaculties }
}
