import { getUsersByRole } from "~/ApiServices/Service/HRUserService"
import { getOrganizations, getSectionStatusCode } from "~/ApiServices/Service/RefLookupService"
import { CUSTOM_FIELD, DATE_PICKERS, DROPDOWN, IField, TEXT } from "~/Component/Common/Form/common"
import { SearchInstructorLookupButton } from "~/Component/Common/Form/SearchLookups/SearchInstructorLookup"
import { SearchSectionLookupButton } from "~/Component/Common/Form/SearchLookups/SearchSectionLookup"

export const InstructorContractsSearchMeta: IField[] = [
  {
    label: "Faculty",
    fieldName: "FacultyID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchInstructorLookupButton
  },
  {
    label: "Section",
    fieldName: "SectionID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchSectionLookupButton
  },
  {
    label: "Offering Name",
    inputType: TEXT,
    fieldName: "OfferingName"
  },
  {
    label: "Offering Name",
    inputType: TEXT,
    fieldName: "OfferingCode"
  },
  {
    label: "Start Date",
    inputType: DATE_PICKERS,
    fieldName: "StartDate",
    fieldName2: "EndDate"
  },
  {
    label: "Department",
    inputType: DROPDOWN,
    fieldName: "orgID",
    refLookupService: getOrganizations,
    displayKey: "Name",
    valueKey: "OrganizationID"
  },
  {
    label: "Status",
    inputType: DROPDOWN,
    fieldName: "statusID",
    refLookupService: getSectionStatusCode,
    displayKey: "Name",
    valueKey: "StatusID"
  },
  {
    label: "Coordinator",
    inputType: DROPDOWN,
    fieldName: "coordName",
    refLookupService: () => getUsersByRole({ Role: "coordinator" }),
    displayKey: "FormattedName",
    valueKey: "UserLogin"
  }
]
