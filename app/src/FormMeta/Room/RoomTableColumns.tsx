import { findRoom } from "~/ApiServices/Service/SectionService"
import { renderBoolean, renderDetailsLink, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getRoomTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      render: (text: any, record: any) => renderDetailsLink(`/room/${record.RoomID}`)
    },
    {
      title: "Room Number",
      dataIndex: "RoomNumber",
      key: "RoomNumber"
    },
    {
      title: "Room Name",
      dataIndex: "Name",
      key: "Name"
    },
    {
      title: "Type",
      dataIndex: "RoomUseTypeID",
      key: "RoomUseTypeID"
      // render: (typeID: number) => (typeID !== undefined && roomTypesMap !== null ? roomTypesMap[typeID] : "")
    },
    {
      title: "Building",
      dataIndex: "BuildingID",
      key: "BuildingID"
      // render: (buildingID: number) =>
      // buildingID !== undefined && buildingNameMap !== null ? buildingNameMap[buildingID] : ""
    },
    {
      title: "Floor",
      dataIndex: "oca",
      key: "oca"
    },
    {
      title: "Capacity",
      dataIndex: "Capacity",
      key: "Capacity"
    },
    { title: "Floor", dataIndex: "oca" },
    { title: "Capacity", dataIndex: "Capacity" },
    { title: "Handicap Access", dataIndex: "IsHandicapAccess", render: renderBoolean }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: findRoom }
}
