// import { searchResourceItem } from "~/ApiServices/Service/FinancialService"
import { DATE_PICKERS, IFilterField } from "~/Component/Common/SearchFilters/common"
import { SearchOfferingLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchOfferingLookup"
import { SearchPersonLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchPersonLookup"
import { SearchSectionLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchSectionLookup"

const meta: IFilterField[] = [
  {
    label: "Section",
    fieldName: "SectionID",
    customFilterComponent: SearchSectionLookupButton
  },
  {
    label: "Offering",
    fieldName: "OfferingID",
    customFilterComponent: SearchOfferingLookupButton
  },
  {
    label: "Person",
    fieldName: "PersonID",
    customFilterComponent: SearchPersonLookupButton
  },
  {
    label: "Section Date",
    fieldName: "StartDateFrom",
    fieldName2: "StartDateTo",
    inputType: DATE_PICKERS
  }
]

export default meta

// SectionID
// OfferingID
// PersonID
// ResourceID
// StartDateFrom
// StartDateTo
// ProductID
