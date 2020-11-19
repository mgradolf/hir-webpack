import { getRoomTypes } from "~/ApiServices/Service/RefLookupService"
import { BOOLEAN, DROPDOWN, IFilterField, NUMBER } from "~/Component/Common/SearchFilters/common"
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
    defaultValue: "",
    fieldName: "RoomUseTypeID",
    ariaLabel: "Room Type Select",
    refLookupService: getRoomTypes,
    displayKey: "Name",
    valueKey: "ID"
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
  },
  {
    fieldName: "Accessible",
    inputType: BOOLEAN,
    defaultValue: "",
    ariaLabel: "Accessible",
    label: "Accessible"
  }
]
