import React from "react"
import { Link } from "react-router-dom"
import { searchProgramOffering } from "~/ApiServices/BizApi/program/programIF"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"

export const getProgramOfferingTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Program Offering Code",
      dataIndex: "ProgramOfferingCode",
      render: (text: any, record: any) =>
        isModal ? text : <Link to={`/program/offering/${record.ProgramOfferingID}`}>{text}</Link>
    },
    { title: "Program Offering Name", dataIndex: "Name" },
    { title: "Status ", dataIndex: "ProgramOfferingStatusCodeName" },
    { title: "Department ", dataIndex: "OrganizationName" }
  ]

  return { columns, searchFunc: searchProgramOffering, tableName: "ProgramOfferingTableColumns" }
}
