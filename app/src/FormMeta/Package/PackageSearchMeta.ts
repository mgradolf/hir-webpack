import { CUSTOM_FIELD, DATE_PICKER, DATE_PICKERS, IField, TEXT } from "~/Component/Common/Form/common"
import { SearchAccountLookup } from "~/Component/Common/Form/SearchLookups/SearchAccountLookup"

export const PackageSearchMeta: IField[] = [
  {
    label: "Account",
    fieldName: "AccountID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchAccountLookup
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
