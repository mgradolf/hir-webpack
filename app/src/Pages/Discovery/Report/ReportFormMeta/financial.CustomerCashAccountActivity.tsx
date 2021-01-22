import { DATE_PICKERS, IFilterField } from "~/Component/Common/SearchFilters/common"
import { SearchAccountLookup } from "~/Component/Common/SearchFilters/SearchLookups/SearchAccountLookup"
import { SearchPersonLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchPersonLookup"
import { IReportMeta } from "~/Pages/Discovery/Report/IReportMeta"

const meta: IFilterField[] = [
  {
    label: "Account Owner",
    fieldName: "PersonID",

    customFilterComponent: SearchPersonLookupButton
  },
  {
    label: "Account",
    fieldName: "AffiliateOrganizationID",
    customFilterComponent: SearchAccountLookup
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

const reportMeta: IReportMeta = {
  meta
}

export default reportMeta
