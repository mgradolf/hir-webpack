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
    ariaLabel: "Room Type Select",
    refLookupService: getRoomTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    fieldName: "Floor",
    inputType: NUMBER,

    ariaLabel: "Floor",
    label: "Floor"
  },
  {
    fieldName: "MinCapacity",
    inputType: NUMBER,

    ariaLabel: "Minimum Capacity",
    label: "Minimum Capacity"
  },
  {
    fieldName: "MaxCapacity",
    inputType: NUMBER,

    ariaLabel: "Maximum Capacity",
    label: "Maximum Capacity"
  },
  {
    fieldName: "Accessible",
    inputType: DROPDOWN,
    options: [
      { label: "Yes", value: "true" },
      { label: "No", value: "false" }
    ],

    ariaLabel: "Accessible",
    label: "Accessible"
  }
]
