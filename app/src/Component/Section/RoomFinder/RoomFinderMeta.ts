import { getRoomTypes } from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, IFilterField } from "~/Component/Common/SearchFilters/common"
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
    inputType: "COMBO_DEPENDENT_ROOM",
    fieldName: "SiteID",
    customFilterComponent: RoomFilter,
    extraProps: { hideRoomDropdown: true }
  }
]

export default RoomFinderMeta
