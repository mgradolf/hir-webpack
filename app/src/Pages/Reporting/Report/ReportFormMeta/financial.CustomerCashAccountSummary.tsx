import { SearchAccountLookup } from "~/Component/Common/SearchFilters/SearchLookups/SearchAccountLookup"
import { CUSTOM_FIELD, IField } from "~/Component/Common/SearchFilters/SearchForm/common"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Account",
    fieldName: "AffiliateOrganizationID",
    customFilterComponent: SearchAccountLookup,
    inputType: CUSTOM_FIELD
  }
]

const reportMeta: IReportMeta = {
  meta
}

export default reportMeta
