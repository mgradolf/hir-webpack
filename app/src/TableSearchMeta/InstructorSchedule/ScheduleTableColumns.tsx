import React from "react"
import { findEntitySchedule } from "~/ApiServices/Service/EntityService"
import { renderDateTime, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import InstructorScheduleMenu from "~/Component/Feature/Instructor/InstructorScheduleMenu"

export const getInstructorScheduleTableColumns = (PersonID?: number, RoomID?: number): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Start Date/Time",
      dataIndex: "StartDate",
      render: renderDateTime
    },
    {
      title: "End Date/Time",
      dataIndex: "EndDate",
      render: renderDateTime
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
      title: "Location",
      dataIndex: "Location"
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => <InstructorScheduleMenu initialData={{ ...record, PersonID }} />
    }
  ]

  return {
    columns,
    searchFunc: () => findEntitySchedule({ PersonID, RoomID }),
    tableName: "ScheduleTableColumns"
  }
}
