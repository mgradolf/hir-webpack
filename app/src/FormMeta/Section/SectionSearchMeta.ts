import { getUsersByRole } from "~/ApiServices/Service/HRUserService"
import { getSectionStatusCode, getOrganizations } from "~/ApiServices/Service/RefLookupService"
import { DATE_PICKERS, DROPDOWN, IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"
import { findMeetingTypes } from "~/ApiServices/BizApi/scheduling/schedulingIF"
import TagFilter from "~/FormMeta/Section/SectionSearchCustomFilters/TagFilter"
import { SearchRoomLookup } from "~/Component/Common/SearchFilters/SearchLookups/SearchRoomLookup"
import { SiteBuildingRoomFilter } from "~/FormMeta/Section/SectionSearchCustomFilters/SiteBuildingRoomFilter"

export const SectionSearchMeta: IFilterField[] = [
  {
    label: "Offering Code",
    inputType: TEXT,
    fieldName: "OfferingCode",
    ariaLabel: "Offering Code"
  },
  {
    label: "Section Number",
    inputType: TEXT,
    defaultValue: "*",
    fieldName: "SectionNumber",
    ariaLabel: "Section Number"
  },
  {
    label: "Start Date",
    inputType: DATE_PICKERS,
    displayKey: "From",
    fieldName: "FromStartDate",
    valueKey: "FromStartDate",
    ariaLabel: "Start Date From",
    displayKey2: "To",
    valueKey2: "ToStartDate",
    fieldName2: "ToStartDate",
    ariaLabel2: "Start Date To"
  },
  {
    label: "Status",
    inputType: DROPDOWN,
    fieldName: "SectionStatusCodeID",
    ariaLabel: "Offering Status Select",
    refLookupService: getSectionStatusCode,
    displayKey: "Name",
    valueKey: "StatusID"
  },
  {
    label: "Offering Name",
    inputType: TEXT,
    fieldName: "OfferingName",
    ariaLabel: "Offering Name"
  },
  {
    label: "Department",
    inputType: DROPDOWN,
    fieldName: "OrganizationID",
    ariaLabel: "Department Select",
    refLookupService: getOrganizations,
    displayKey: "Name",
    valueKey: "OrganizationID"
  },
  {
    label: "Instructor Last Name",
    inputType: TEXT,
    fieldName: "SectionFacultyLastName",
    ariaLabel: "Instructor last name"
  },
  {
    label: "Instructor First Name",
    inputType: TEXT,
    fieldName: "SectionFacultyFirstName",
    ariaLabel: "Instructor first name"
  },
  {
    label: "Meeting Type",
    inputType: DROPDOWN,
    fieldName: "MeetingType",
    ariaLabel: "Meeting Type",
    refLookupService: findMeetingTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Room",
    fieldName: "RoomID",
    customFilterComponent: SearchRoomLookup
  },
  {
    label: "Room",
    fieldName: "RoomID",
    customFilterComponent: SiteBuildingRoomFilter
  },
  {
    label: "Meets On",
    inputType: DROPDOWN,
    fieldName: "MeetsOn",
    ariaLabel: "Meets on Weekdays",
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
    customFilterComponent: TagFilter
  },
  {
    label: "Coordinator",
    inputType: DROPDOWN,
    fieldName: "Coordinator",
    ariaLabel: "Coordinator Select",
    refLookupService: () => getUsersByRole({ Role: "coordinator" }),
    displayKey: "FormattedName",
    valueKey: "UserLogin"
  }
]
