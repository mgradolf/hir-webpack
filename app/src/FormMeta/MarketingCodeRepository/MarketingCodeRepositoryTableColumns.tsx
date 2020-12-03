import React from "react"
import { Link } from "react-router-dom"
import { searchMarketingCodes } from "~/ApiServices/Service/MarketingService"
import { renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getMarketingCodeRepositoryTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Code",
      dataIndex: "Name",
      render: (text: any, record: any) =>
        isModal ? text : <Link to={`/marketing-codes/repository/${record.MarketingCodeID}`}>{text}</Link>
    },
    {
      title: "Description",
      dataIndex: "Description"
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
      title: "Category",
      dataIndex: "CategoryName"
    }
  ]

  const responsiveColumnIndices: number[] = [2]
  const expandableColumnIndices: number[] = [2]
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: searchMarketingCodes }
}
