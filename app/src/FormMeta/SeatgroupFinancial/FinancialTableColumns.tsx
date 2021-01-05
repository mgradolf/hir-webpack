import React from "react"
import { Switch } from "antd"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
import { getSectionFinancials } from "~/ApiServices/Service/SectionService"

export const getSeatgroupFinancialTableColumns = (): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Type",
      dataIndex: "FinancialType"
    },
    {
      title: "Item",
      dataIndex: "ItemName"
    },
    {
      title: "Description",
      dataIndex: "Description"
    },
    {
      title: "GL Account",
      dataIndex: "GLAccount"
    },
    {
      title: "Basis",
      dataIndex: "FinancialBasisType"
    },
    {
      title: "Amount",
      dataIndex: "ItemUnitAmount"
    },
    {
      title: "Action",
      dataIndex: "IsApplicable",
      render: (text: any, record: any) => <Switch checked={!!text} />
    }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: getSectionFinancials }
}
