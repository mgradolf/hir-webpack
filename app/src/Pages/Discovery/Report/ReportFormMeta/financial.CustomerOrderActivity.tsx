import { DATE_PICKERS, IFilterField, NUMBER, TEXT } from "~/Component/Common/SearchFilters/common"
import { SearchPersonLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchPersonLookup"

const meta: IFilterField[] = [
  {
    label: "Person",
    fieldName: "PersonID",
    customFilterComponent: SearchPersonLookupButton
  },
  {
    label: "Affiliated Org",
    inputType: TEXT,
    fieldName: "AffiliatedOrg"
  },
  {
    label: "Cash Account Balance",
    inputType: NUMBER,
    fieldName: "CashAccountBalance"
  },
  {
    label: "Total Outstanding Balance",
    inputType: NUMBER,
    fieldName: "TotalOutstandingBalance"
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
