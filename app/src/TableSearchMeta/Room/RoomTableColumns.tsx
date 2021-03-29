import { findRooms } from "~/ApiServices/BizApi/query/queryIf"
import { renderBoolean, renderLink, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"

export const getRoomTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Room Number",
      dataIndex: "RoomNumber",
      render: (text: any, record: any) => renderLink(`/room/${record.RoomID}`, text)
    },
    {
      title: "Room Name",
      dataIndex: "Name"
    },
    {
      title: "Building",
      dataIndex: "BuildingNumber",
      render: (text: any, record: any) => renderLink(`/building/${record.BuildingID}`, text)
    },
    {
      title: "Floor",
      dataIndex: "BuildingFloor"
    },
    {
      title: "Capacity",
      dataIndex: "Capacity"
    },
    { title: "Accessible", dataIndex: "IsHandicapAccess", render: renderBoolean }
  ]

  return { columns, searchFunc: findRooms, tableName: "RoomTableColumns" }
}
