import { DATE_PICKERS, IFilterField } from "~/Component/Common/SearchFilters/common"
import { SearchPersonLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchPersonLookup"
import { SearchSectionLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchSectionLookup"
import { SearchStudentLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchStudentLookup"

export const RegistrationSearchMeta: IFilterField[] = [
  {
    label: "Section",
    fieldName: "SectionID",
    customFilterComponent: SearchSectionLookupButton
  },
  {
    label: "Purchaser",
    fieldName: "PersonID",
    customFilterComponent: SearchPersonLookupButton
  },
  {
    label: "Student",
    fieldName: "StudentID",
    customFilterComponent: SearchStudentLookupButton
  },
  {
    label: "Account",
    fieldName: "AccountID",
    customFilterComponent: SearchStudentLookupButton
  },
  {
    label: "Start Date",
    inputType: DATE_PICKERS,
    displayKey: "From",

    fieldName: "StartDateFrom",
    valueKey: "StartDateFrom",
    ariaLabel: "Start Date From",
    displayKey2: "To",
    valueKey2: "StartDateTo",
    fieldName2: "StartDateTo",
    ariaLabel2: "Start Date To"
  },
  {
    label: "Create Date",
    inputType: DATE_PICKERS,
    displayKey: "From",

    fieldName: "CreatedFromDate",
    valueKey: "CreatedFromDate",
    ariaLabel: "Start Date From",
    displayKey2: "To",
    valueKey2: "CreatedToDate",
    fieldName2: "CreatedToDate",
    ariaLabel2: "Start Date To"
  }
]
