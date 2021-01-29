import { CUSTOM_FIELD, DATE_PICKER, DATE_PICKERS, IField, TEXT } from "~/Component/Common/Form/common"
import { AccountLookup } from "~/Component/Common/Form/FormLookupFields/AccountLookup"

export const PackageSearchMeta: IField[] = [
  {
    label: "Account",
    fieldName: "AccountID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: AccountLookup
  },
  {
    label: "Start Date",
    inputType: DATE_PICKERS,
    displayKey: "From",
    fieldName: "StartDate",
    valueKey: "StartDate",
    displayKey2: "To",
    fieldName2: "EndDate",
    valueKey2: "EndDate"
  },
  {
    label: "Name",
    inputType: TEXT,
    fieldName: "Name"
  },
  {
    label: "PO Number",
    inputType: TEXT,
    fieldName: "PONumber"
  },
  {
    label: "PO Date",
    inputType: DATE_PICKER,
    fieldName: "PODate"
  }
]
