import { DATE_PICKER, DATE_PICKERS, IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"
import { SearchAccountLookup } from "~/Component/Common/SearchFilters/SearchLookups/SearchAccountLookup"

export const PackageSearchMeta: IFilterField[] = [
  {
    label: "Account",
    fieldName: "AccountID",
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
    label: "PO Number",
    inputType: TEXT,
    fieldName: "PONumber",
    ariaLabel: "PO Number"
  },
  {
    label: "PO Date",
    inputType: DATE_PICKER,
    fieldName: "PODate",
    ariaLabel: "PO Date"
  },
  {
    label: "Name",
    inputType: TEXT,
    fieldName: "Name",
    ariaLabel: "Name"
  }
]
