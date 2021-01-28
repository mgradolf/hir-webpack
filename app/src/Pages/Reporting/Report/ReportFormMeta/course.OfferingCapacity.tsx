import { CUSTOM_FIELD, IField } from "~/Component/Common/SearchForm/common"
import { SearchOfferingLookupButton } from "~/Component/Common/SearchForm/SearchLookups/SearchOfferingLookup"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Offering",
    fieldName: "OfferingID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchOfferingLookupButton,
    rules: [{ required: true, message: "Offering is Required" }]
  }
]

const reportMeta: IReportMeta = {
  meta
}

export default reportMeta
