import { CUSTOM_FIELD, DATE_PICKERS, IField, NUMBER } from "~/Component/Common/Form/common"
import { AccountLookup } from "~/Component/Common/Form/FormLookupFields/AccountLookup"
import { SearchPackageLookupButton } from "~/Component/Common/Form/FormLookupFields/PackageLookup"
import { PersonLookup } from "~/Component/Common/Form/FormLookupFields/PersonLookup"
import { SectionLookup } from "~/Component/Common/Form/FormLookupFields/SectionLookup"
import { StudentLookup } from "~/Component/Common/Form/FormLookupFields/StudentLookup"

export const RegistrationSearchMeta: IField[] = [
  {
    label: "Section",
    fieldName: "SectionID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SectionLookup
  },
  {
    label: "Student",
    fieldName: "StudentID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: StudentLookup
  },
  {
    label: "Purchaser",
    fieldName: "PersonID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: PersonLookup
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
    customFilterComponent: AccountLookup
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
