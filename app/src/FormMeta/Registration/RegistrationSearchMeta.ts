import { DATE_PICKERS, IFilterField, NUMBER } from "~/Component/Common/SearchFilters/common"
import { SearchAccountLookup } from "~/Component/Common/SearchFilters/SearchLookups/SearchAccountLookup"
import { SearchPackageLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchPackageLookup"
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
    label: "Student",
    fieldName: "StudentID",
    customFilterComponent: SearchStudentLookupButton
  },
  {
    label: "Purchaser",
    fieldName: "PersonID",
    customFilterComponent: SearchPersonLookupButton
  },
  {
    label: "Order Date",
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
    label: "Order ID",
    inputType: NUMBER,
    fieldName: "OrderID",
    ariaLabel: "Order ID"
  },
  {
    label: "Account",
    fieldName: "AccountID",
    customFilterComponent: SearchAccountLookup
  },
  {
    label: "Package",
    fieldName: "PackageID",
    customFilterComponent: SearchPackageLookupButton
  },
  // {
  //   label: "Create Date",
  //   inputType: DATE_PICKERS,
  //   displayKey: "From",

  //   fieldName: "CreatedFromDate",
  //   valueKey: "CreatedFromDate",
  //   ariaLabel: "Start Date From",
  //   displayKey2: "To",
  //   valueKey2: "CreatedToDate",
  //   fieldName2: "CreatedToDate",
  //   ariaLabel2: "Start Date To"
  // }
]
