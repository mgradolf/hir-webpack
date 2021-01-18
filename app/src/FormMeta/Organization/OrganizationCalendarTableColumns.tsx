import React from "react"
import { Link } from "react-router-dom"
//TODO: API fix
import { findOrganizationCalendar } from "~/ApiServices/BizApi/query/queryIf"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getOrganizationCalendarTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Start Date",
      dataIndex: "StartDate",
      render: renderDate
    },
    {
      title: "Start Time",
      dataIndex: "StartDate",
      render: renderTime
    },
    {
      title: "End Date",
      dataIndex: "EndDate",
      render: renderDate
    },
    {
      title: "End Time",
      dataIndex: "EndDate",
      render: renderTime
    },
    {
      title: "Name",
      dataIndex: "Name"
    },
    {
      title: "Description",
      dataIndex: "Description"
    }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: findOrganizationCalendar }
}
