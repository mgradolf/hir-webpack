import { getUsersByRole } from "~/ApiServices/Service/HRUserService"
import { getSectionStatusCode, getOrganizations, getTagTypes } from "~/ApiServices/Service/RefLookupService"
import { DATE_PICKERS, DROPDOWN, IFilterField, TEXT } from "~/Component/SearchFilters/common"
import { findMeetingTypes } from "~/ApiServices/BizApi/schedule/scheduleIf"

const offeringMeta: IFilterField[] = [
  {
    label: "Offering Code",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "OfferingCode",
    ariaLabel: "Offering Code"
  },
  {
    label: "Offering Name",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "OfferingName",
    ariaLabel: "Offering Name"
  },
  {
    label: "Section Number",
    inputType: TEXT,
    defaultValue: "*",
    fieldName: "SectionNumber",
    ariaLabel: "Section Number"
  },
  {
    label: "Instructor first name",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "SectionFacultyFirstName",
    ariaLabel: "Instructor first name"
  },
  {
    label: "Instructor last name",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "SectionFacultyLastName",
    ariaLabel: "Instructor last name"
  },
  {
    label: "Start Date",
    inputType: DATE_PICKERS,
    displayKey: "From",
    defaultValue: "",
    fieldName: "FromStartDate",
    valueKey: "FromStartDate",
    ariaLabel: "Start Date From",
    displayKey2: "To",
    valueKey2: "ToStartDate",
    fieldName2: "ToStartDate",
    ariaLabel2: "Start Date To"
  },
  {
    label: "Creation Date",
    inputType: DATE_PICKERS,
    displayKey: "From",
    defaultValue: "",
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
    defaultValue: "",
    ariaLabel: "Termination Date From",
    displayKey2: "To",
    fieldName2: "ToTerminationDate",
    valueKey2: "ToTerminationDate",
    ariaLabel2: "Termination Date To"
  },
  {
    label: "Is QuickAdmit",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "IsQuickAdmit",
    ariaLabel: "Is Quick Admit",
    options: [
      { label: "Yes", value: "true" },
      { label: "No", value: "false" }
    ]
  },
  {
    label: "Status",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "StatusID",
    ariaLabel: "Offering Status Select",
    refLookupService: getSectionStatusCode,
    displayKey: "Name",
    valueKey: "StatusID"
  },
  {
    label: "Department",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "OrganizationID",
    ariaLabel: "Department Select",
    refLookupService: getOrganizations,
    displayKey: "Name",
    valueKey: "OrganizationID"
  },
  {
    label: "Meets On",
    inputType: DROPDOWN,
    defaultValue: "",
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
    defaultValue: "",
    fieldName: "MeetingType",
    ariaLabel: "Meeting Type",
    refLookupService: findMeetingTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Coordinator",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "Coordinator",
    ariaLabel: "Coordinator Select",
    refLookupService: () => getUsersByRole({ Role: "coordinator" }),
    displayKey: "FormattedName",
    valueKey: "UserLogin"
  },
  {
    label: "Tag Type",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "TagTypeID",
    ariaLabel: "Tag Type Select",
    refLookupService: getTagTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Tag",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "TagName",
    ariaLabel: "Tag name"
  }
]

export default offeringMeta
