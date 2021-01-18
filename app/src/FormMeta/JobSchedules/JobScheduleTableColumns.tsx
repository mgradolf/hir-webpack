import React from "react"
import { renderBoolean, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
//TODO: Update the API end point 
import { findJobSchedules } from "~/ApiServices/Service/FinancialService"
import { Link } from "react-router-dom"

export const getJobScheduleTableColumns = (): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Job Name",
      dataIndex: "ScheduleName"
    },  
    {
      title: "Service",
      dataIndex: "ServiceName"
    },
    {
      title: "Frequency",
      dataIndex: "FrequencyDescriptor"
    },
    {
      title: "Next Run",
      dataIndex: "NextRun"
    }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: findJobSchedules }
}
