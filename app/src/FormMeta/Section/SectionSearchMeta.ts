import { getUsersByRole } from "~/ApiServices/Service/HRUserService"
import { getSectionStatusCode, getOrganizations } from "~/ApiServices/Service/RefLookupService"
import { DATE_PICKERS, DROPDOWN, IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"
import { findMeetingTypes } from "~/ApiServices/BizApi/scheduling/schedulingIF"
import TagFilter from "~/FormMeta/Section/SectionSearchCustomFilters/TagFilter"
import { SearchRoomLookup } from "~/Component/Common/SearchFilters/SearchLookups/SearchRoomLookup"

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
    label: "Instructor first name",
    inputType: TEXT,
    fieldName: "SectionFacultyFirstName",
    ariaLabel: "Instructor first name"
  },
  {
    label: "Instructor last name",
    inputType: TEXT,
    fieldName: "SectionFacultyLastName",
    ariaLabel: "Instructor last name"
  },
  {
    label: "Creation Date",
    inputType: DATE_PICKERS,
    displayKey: "From",
    fieldName: "FromCreationDate",
    valueKey: "FromCreationDate",
    ariaLabel: "Creation Date From",
    displayKey2: "To",
    valueKey2: "ToCreationDate",
    fieldName2: "ToCreationDate",
    ariaLabel2: "Creation Date To"
  },
  {
    label: "Termination Date",
    inputType: DATE_PICKERS,
    displayKey: "From",
    fieldName: "FromTerminationDate",
    valueKey: "FromTerminationDate",
    ariaLabel: "Termination Date From",
    displayKey2: "To",
    fieldName2: "ToTerminationDate",
    valueKey2: "ToTerminationDate",
    ariaLabel2: "Termination Date To"
  },
  {
    label: "Is QuickAdmit",
    inputType: DROPDOWN,
    fieldName: "IsQuickAdmit",
    ariaLabel: "Is Quick Admit",
    options: [
      { label: "Yes", value: "true" },
      { label: "No", value: "false" }
    ]
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
    label: "Meeting Type",
    inputType: DROPDOWN,
    fieldName: "MeetingType",
    ariaLabel: "Meeting Type",
    refLookupService: findMeetingTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Coordinator",
    inputType: DROPDOWN,
    fieldName: "Coordinator",
    ariaLabel: "Coordinator Select",
    refLookupService: () => getUsersByRole({ Role: "coordinator" }),
    displayKey: "FormattedName",
    valueKey: "UserLogin"
  },
  {
    label: "Search Tag Hierarchy",
    fieldName: "searchTagHeirarchy",
    customFilterComponent: TagFilter
  },
  {
    label: "Room",
    fieldName: "RoomID",
    customFilterComponent: SearchRoomLookup
  }
]
