import { DATE_PICKERS, IFilterField } from "~/Component/Common/SearchFilters/common"
import { SearchPersonLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchPersonLookup"

const meta: IFilterField[] = [
  {
    label: "Person",
    fieldName: "PersonID",
    customFilterComponent: SearchPersonLookupButton
  },
  {
    label: "Order Date",
    fieldName: "OrderDateFrom",
    fieldName2: "OrderDateTo",
    inputType: DATE_PICKERS
  }
]

export default meta

// PersonID
// PersonAddress
// PersonName
// AffiliatedOrg
// CashAccountBalance
// TotalOutstandingBalance
// OrderDateFrom
// OrderDateTo
