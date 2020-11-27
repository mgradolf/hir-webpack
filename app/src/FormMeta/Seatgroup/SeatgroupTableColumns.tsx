import React from "react"
import { renderBoolean, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
import { getSeatGroups } from "~/ApiServices/Service/SeatGroupService"
import { Button, Dropdown } from "antd"
import { DownOutlined } from "@ant-design/icons"
import SeatGroupMenu from "~/Component/Section/SeatGroup/SeatGroupMenu"

export const getSeatgroupTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    { title: "Seat Group Name", dataIndex: "Name" },
    { title: "Default Seat Group", dataIndex: "IsDefault", render: renderBoolean },
    { title: "Total Seats", dataIndex: "NumberOfSeats" },
    { title: "Reserved Seats", dataIndex: "ReservedSeats" },
    { title: "Enrolled Seats", dataIndex: "EnrolledSeats" },
    { title: "Available Seats", dataIndex: "AvailableSeats" },
    { title: "Estimated Seats", dataIndex: "EstimatedEnrollment" },
    { title: "Due Date Policy", dataIndex: "DueDatePolicy" },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Dropdown
          overlay={
            <SeatGroupMenu
              additionalData={record}
            />
          }
          trigger={["click"]}
        >
          <Button type="primary" onClick={(e) => e.preventDefault()}>
            Go To <DownOutlined />
          </Button>
        </Dropdown>

      )
    }
  ]

  const responsiveColumnIndices = [1, 3, 4, 5, 6, 7, 8]
  const expandableColumnIndices = [8]
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: getSeatGroups }
}
