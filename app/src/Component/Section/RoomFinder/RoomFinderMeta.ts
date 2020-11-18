import { getRoomTypes } from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, IFilterField, NUMBER } from "~/Component/Common/SearchFilters/common"
import RoomFilter from "~/FormMeta/Section/SectionSearchCustomFilters/RoomFilter"

const RoomFinderMeta: IFilterField[] = [
  {
    label: "Room Type",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "RoomUseTypeID",
    ariaLabel: "Room Type Select",
    refLookupService: getRoomTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Site",
    fieldName: "SiteID",
    customFilterComponent: RoomFilter,
    extraProps: { hideRoomDropdown: true }
  },
  {
    fieldName: "Floor",
    inputType: NUMBER,
    defaultValue: "",
    ariaLabel: "Floor",
    label: "Floor"
  },
  {
    fieldName: "MinCapacity",
    inputType: NUMBER,
    defaultValue: "",
    ariaLabel: "Minimum Capacity",
    label: "Minimum Capacity"
  },
  {
    fieldName: "MaxCapacity",
    inputType: NUMBER,
    defaultValue: "",
    ariaLabel: "Maximum Capacity",
    label: "Maximum Capacity"
  }
]

export default RoomFinderMeta
