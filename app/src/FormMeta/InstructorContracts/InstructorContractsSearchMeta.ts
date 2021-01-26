import { getUsersByRole } from "~/ApiServices/Service/HRUserService"
import { getOrganizations, getSectionStatusCode } from "~/ApiServices/Service/RefLookupService"
import { DATE_PICKERS, DROPDOWN, IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"
import { SearchInstructorLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchInstructorLookup"
import { SearchSectionLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchSectionLookup"

export const InstructorContractsSearchMeta: IFilterField[] = [
  {
    label: "Faculty",
    fieldName: "FacultyID",
    customFilterComponent: SearchInstructorLookupButton
  },
  {
    label: "Section",
    fieldName: "SectionID",
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
