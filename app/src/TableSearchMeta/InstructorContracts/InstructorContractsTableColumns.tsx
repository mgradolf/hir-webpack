import React from "react"
import { Link } from "react-router-dom"
import { searchSectionInstructor } from "~/ApiServices/Service/InstructorService"
import { renderDate, renderLink, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"

export const getInstructorContractsTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Name",
      dataIndex: "FirstName",
      render: (text: any, record: any) => renderLink(`/person/${record.PersonID}`, text + " " + record.LastName)
    },
    {
      title: "Section Number",
      dataIndex: "SectionNumber",
      render: (text: any, record: any) => <Link to={`/section/${record.SectionID}`}>{text}</Link>
    },
    { title: "Status", dataIndex: "SectionStatusCodeName" },
    { title: "StartDate", dataIndex: "StartDate", render: renderDate },
    { title: "EndDate", dataIndex: "EndDate", render: renderDate },
    { title: "Current Enrollment", dataIndex: "CurrentEnrollment" },
    { title: "Max Enrollment", dataIndex: "MaxEnrollment" },
    { title: "Pay Rate", dataIndex: "Amount" }
  ]

  return { columns, searchFunc: searchSectionInstructor, tableName: "InstructorContractsTableColumns" }
}
