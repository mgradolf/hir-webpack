import { findRoom } from "~/ApiServices/Service/SectionService"
import { renderBoolean, renderDetailsLink, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getRoomTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Room Number",
      dataIndex: "RoomNumber",
      key: "RoomNumber",
      render: (text: any, record: any) => renderDetailsLink(`/room/${record.RoomID}`)
    },
    {
      title: "Room Name",
      dataIndex: "Name",
      key: "Name"
    },
    {
      title: "Building",
      dataIndex: "BuildingNumber",
      key: "BuildingNumber",
      render: (text: any, record: any) => renderDetailsLink(`/building/${record.BuildingID}`)
    },
    {
      title: "Floor",
      dataIndex: "BuildingFloor",
      key: "BuildingFloor"
    },
    {
      title: "Capacity",
      dataIndex: "Capacity",
      key: "Capacity"
    },
    { title: "Accessible", dataIndex: "IsHandicapAccess", render: renderBoolean }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: findRoom }
}
