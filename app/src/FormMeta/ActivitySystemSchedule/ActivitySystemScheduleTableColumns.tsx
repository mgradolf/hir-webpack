import React from "react"
import { renderBoolean, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
//TODO: Update the API end point 
import { findSystemSchedules } from "~/ApiServices/Service/FinancialService"
import { Link } from "react-router-dom"

export const getActivitySystemScheduleTableColumns = (): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "",
      dataIndex: "TimerID",
      render: (text: any, record: any) => (
        <Link to={`/systemschedule/${record.TimerID}`}>
          <ReadOutlined />
        </Link>
      )
    },  
    {
      title: "Schedule Time",
      dataIndex: "NextScheduledTime",
      render: renderDateTime,
      width: 100
    },  
    {
      title: "Service Name",
      dataIndex: "ServiceName"
    },  
    {
      title: "Completed",
      dataIndex: "IsCompleted",
      render: renderBoolean
    }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: findSystemSchedules }
}
