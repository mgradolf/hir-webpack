import { CUSTOM_FIELD, DATE_PICKERS, IField, NUMBER } from "~/Component/Common/Form/common"
import { SearchAccountLookup } from "~/Component/Common/Form/SearchLookups/SearchAccountLookup"
import { SearchPackageLookupButton } from "~/Component/Common/Form/SearchLookups/SearchPackageLookup"
import { SearchPersonLookupButton } from "~/Component/Common/Form/SearchLookups/SearchPersonLookup"
import { SearchSectionLookupButton } from "~/Component/Common/Form/SearchLookups/SearchSectionLookup"
import { SearchStudentLookupButton } from "~/Component/Common/Form/SearchLookups/SearchStudentLookup"

export const RegistrationSearchMeta: IField[] = [
  {
    label: "Section",
    fieldName: "SectionID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchSectionLookupButton
  },
  {
    label: "Student",
    fieldName: "StudentID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchStudentLookupButton
  },
  {
    label: "Purchaser",
    fieldName: "PersonID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchPersonLookupButton
  },
  {
    label: "Order Date",
    inputType: DATE_PICKERS,
    displayKey: "From",
    fieldName: "StartDateFrom",
    valueKey: "StartDateFrom",
    displayKey2: "To",
    valueKey2: "StartDateTo",
    fieldName2: "StartDateTo"
  },
  {
    label: "Order ID",
    inputType: NUMBER,
    fieldName: "OrderID"
  },
  {
    label: "Account",
    fieldName: "AccountID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchAccountLookup
  },
  {
    label: "Package",
    fieldName: "PackageID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchPackageLookupButton
  }
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
