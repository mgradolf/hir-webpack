import { IFilterField } from "~/Component/Common/SearchFilters/common"
import { SearchOfferingLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchOfferingLookup"
import { IReportMeta } from "~/Pages/Discovery/Report/IReportMeta"

const meta: IFilterField[] = [
  {
    label: "Offering",
    fieldName: "OfferingID",

    customFilterComponent: SearchOfferingLookupButton
  }
]

const reportMeta: IReportMeta = {
  meta
}

export default reportMeta
