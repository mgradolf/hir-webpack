import { getUsersByRole } from "~/ApiServices/Service/HRUserService"
import { getSectionStatusCode, getOrganizations } from "~/ApiServices/Service/RefLookupService"
import { CUSTOM_FIELD, DATE_PICKERS, DROPDOWN, IField, TEXT } from "~/Component/Common/Form/common"
import { findMeetingTypes } from "~/ApiServices/BizApi/scheduling/schedulingIF"
import TagFilter from "~/FormMeta/Section/SectionSearchCustomFilters/TagFilter"
import { SearchRoomLookup } from "~/Component/Common/Form/SearchLookups/SearchRoomLookup"
import { SiteBuildingRoomFilter } from "~/FormMeta/Section/SectionSearchCustomFilters/SiteBuildingRoomFilter"

export const SectionSearchMeta: IField[] = [
  {
    label: "Offering Code",
    inputType: TEXT,
    fieldName: "OfferingCode"
  },
  {
    label: "Section Number",
    inputType: TEXT,
    defaultValue: "*",
    fieldName: "SectionNumber"
  },
  {
    label: "Start Date",
    inputType: DATE_PICKERS,
    displayKey: "From",
    fieldName: "FromStartDate",
    valueKey: "FromStartDate",
    displayKey2: "To",
    valueKey2: "ToStartDate",
    fieldName2: "ToStartDate"
  },
  {
    label: "Status",
    inputType: DROPDOWN,
    fieldName: "SectionStatusCodeID",
    refLookupService: getSectionStatusCode,
    displayKey: "Name",
    valueKey: "StatusID"
  },
  {
    label: "Offering Name",
    inputType: TEXT,
    fieldName: "OfferingName"
  },
  {
    label: "Department",
    inputType: DROPDOWN,
    fieldName: "OrganizationID",
    refLookupService: getOrganizations,
    displayKey: "Name",
    valueKey: "OrganizationID"
  },
  {
    label: "Instructor Last Name",
    inputType: TEXT,
    fieldName: "SectionFacultyLastName"
  },
  {
    label: "Instructor First Name",
    inputType: TEXT,
    fieldName: "SectionFacultyFirstName"
  },
  {
    label: "Meeting Type",
    inputType: DROPDOWN,
    fieldName: "MeetingType",
    refLookupService: findMeetingTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Room",
    fieldName: "RoomID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchRoomLookup
  },
  {
    label: "Room",
    fieldName: "RoomID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SiteBuildingRoomFilter
  },
  {
    label: "Meets On",
    inputType: DROPDOWN,
    fieldName: "MeetsOn",
    options: [
      { label: "Monday", value: "1" },
      { label: "Tuesday", value: "2" },
      { label: "Wednesday", value: "3" },
      { label: "Thursday", value: "4" },
      { label: "Friday", value: "5" },
      { label: "Saturday", value: "6" },
      { label: "Sunday", value: "7" }
    ]
  },
  {
    label: "Search Tag Hierarchy",
    fieldName: "searchTagHeirarchy",
    inputType: CUSTOM_FIELD,
    customFilterComponent: TagFilter
  },
  {
    label: "Coordinator",
    inputType: DROPDOWN,
    fieldName: "Coordinator",
    refLookupService: () => getUsersByRole({ Role: "coordinator" }),
    displayKey: "FormattedName",
    valueKey: "UserLogin"
  }
]
