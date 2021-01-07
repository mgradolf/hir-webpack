import { DATE_PICKERS, IFilterField } from "~/Component/Common/SearchFilters/common"
import { SearchPersonLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchPersonLookup"

const meta: IFilterField[] = [
  {
    label: "Account Owner",
    fieldName: "PersonID",
    customFilterComponent: SearchPersonLookupButton
  },
  {
    label: "Select Date",
    inputType: DATE_PICKERS,

    displayKey: "From",
    fieldName: "TxDateFrom",
    valueKey: "FromDate",
    displayKey2: "To",
    fieldName2: "TxDateTo",
    valueKey2: "ToDate"
  }
]

export default meta
