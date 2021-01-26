import { getRoomTypes } from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, IFilterField, NUMBER } from "~/Component/Common/SearchFilters/common"
import RoomFilter from "~/FormMeta/Room/RoomFilter"

export const RoomeSearchMeta: IFilterField[] = [
  {
    label: "Site",
    fieldName: "SiteID",
    customFilterComponent: RoomFilter,
    extraProps: { hideRoomDropdown: true }
  },
  {
    label: "Room Type",
    inputType: DROPDOWN,
    fieldName: "RoomUseTypeID",
    refLookupService: getRoomTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    fieldName: "Floor",
    inputType: NUMBER,
    label: "Floor"
  },
  {
    fieldName: "MinCapacity",
    inputType: NUMBER,
    label: "Minimum Capacity"
  },
  {
    fieldName: "MaxCapacity",
    inputType: NUMBER,
    label: "Maximum Capacity"
  },
  {
    fieldName: "Accessible",
    inputType: DROPDOWN,
    options: [
      { label: "Yes", value: "true" },
      { label: "No", value: "false" }
    ],
    label: "Accessible"
  }
]
