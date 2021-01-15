import { IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"

const meta: IFilterField[] = [
  {
    label: "Instructor Name",
    inputType: TEXT,
    fieldName: "InstructorParam"
  },
  {
    label: "Room Name",
    inputType: TEXT,
    fieldName: "RoomNameParam"
  },
  {
    label: "Room Number",
    inputType: TEXT,
    fieldName: "RoomNumberParam"
  },
  {
    label: "Building Name",
    inputType: TEXT,
    fieldName: "BuildingNameParam"
  },
  {
    label: "Building Number",
    inputType: TEXT,
    fieldName: "BuildingNumberParam"
  },
  {
    label: "Site Name",
    inputType: TEXT,
    fieldName: "SiteNameParam"
  },
  {
    label: "Other Location",
    inputType: TEXT,
    fieldName: "OtherLocation"
  }
]

export default meta
