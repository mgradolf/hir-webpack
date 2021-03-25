import React from "react"
import { Button, Dropdown } from "antd"
import { findEntitySchedule } from "~/ApiServices/Service/EntityService"
import { renderDateTime, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { DownOutlined } from "@ant-design/icons"
import InstructorScheduleMenu from "~/Component/Instructor/InstructorScheduleMenu"

export const getInstructorScheduleTableColumns = (PersonID?: number): ITableConfigProp => {
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
      render: (record: any) => (
        <Dropdown overlay={<InstructorScheduleMenu initialData={{ ...record, PersonID }} />} trigger={["click"]}>
          <Button type="primary" onClick={(e) => e.preventDefault()}>
            Go To <DownOutlined />
          </Button>
        </Dropdown>
      )
    }
  ]

  return {
    columns,
    searchFunc: () => findEntitySchedule({ PersonID }),
    tableName: "ScheduleTableColumns"
  }
}
