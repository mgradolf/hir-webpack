import React from "react"
import { renderBoolean, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
//TODO: Update the API end point 
import { findSystemConfiguration } from "~/ApiServices/Service/FinancialService"
import { Link } from "react-router-dom"

export const getSystemConfigurationTableColumns = (): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Group Name",
      dataIndex: "GroupName"
    },  
    {
      title: "Name",
      dataIndex: "Name"
    },
    {
      title: "Description",
      dataIndex: "Description"
    },
    {
      title: "Current Value",
      dataIndex: "CurrentValue"
    }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: findSystemConfiguration }
}
