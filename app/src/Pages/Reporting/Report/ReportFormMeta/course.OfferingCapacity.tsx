import { CUSTOM_FIELD, IField } from "~/Component/Common/SearchFilters/SearchForm/common"
import { SearchOfferingLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchOfferingLookup"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Offering",
    fieldName: "OfferingID",
    customFilterComponent: SearchOfferingLookupButton,
    inputType: CUSTOM_FIELD
  }
]

const reportMeta: IReportMeta = {
  meta
}

export default reportMeta
