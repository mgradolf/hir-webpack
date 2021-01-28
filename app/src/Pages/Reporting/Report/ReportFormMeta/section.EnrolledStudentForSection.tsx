import { CUSTOM_FIELD, IField } from "~/Component/Common/SearchForm/common"
import { SearchSectionLookupButton } from "~/Component/Common/SearchForm/SearchLookups/SearchSectionLookup"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Section",
    fieldName: "SectionID",
    rules: [{ required: true, message: "Section is Required" }],
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchSectionLookupButton
  }
]

const reportMeta: IReportMeta = {
  meta
}

export default reportMeta
