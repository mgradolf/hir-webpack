import React from "react"
import { renderDateTime, ResponsiveTable, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { REFRESH_REQUEST_ACTIVITY_TAB } from "~/utils/EventBus"

export interface ITableWrapperProps {
  dataSource: Array<any>
  loading: boolean
}

export function RequestActivityTable(props: ITableWrapperProps) {
  const columns: TableColumnType = [
    {
      title: "Date",
      dataIndex: "ActivityDate",
      render: renderDateTime
    },
    {
      title: "Source",
      dataIndex: "ActivitySource"
    },
    {
      title: "Activity By",
      dataIndex: "ActivityBy"
    },
    {
      title: "Description",
      dataIndex: "ActivityDescription"
    }
  ]

  return (
    <ResponsiveTable columns={columns} dataSource={props.dataSource} refreshEventName={REFRESH_REQUEST_ACTIVITY_TAB} />
  )
}
