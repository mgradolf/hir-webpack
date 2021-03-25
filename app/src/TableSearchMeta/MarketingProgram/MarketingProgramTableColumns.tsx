import React from "react"
import { renderBoolean, renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { searchMarketingProgram } from "~/ApiServices/Service/FinancialService"
import { Link } from "react-router-dom"

export const getMarketingProgramTableColumns = (): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Name",
      dataIndex: "MarketSource",
      render: (text: any, record: any) => <Link to={`/marketing-programs/${record.MarketingProgramID}`}>{text}</Link>
    },
    {
      title: "Start Date",
      dataIndex: "StartDate",
      render: renderDate
    },
    {
      title: "End Date",
      dataIndex: "EndDate",
      render: renderDate
    },
    {
      title: "Active",
      dataIndex: "IsActive",
      render: renderBoolean
    }
  ]

  return { columns, searchFunc: searchMarketingProgram, tableName: "MarketingProgramTableColumns" }
}
