import { CUSTOM_FIELD, IField } from "~/Component/Common/SearchFilters/SearchForm/common"
import { SearchSectionLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchSectionLookup"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Section",
    fieldName: "SectionID",
    customFilterComponent: SearchSectionLookupButton,
    inputType: CUSTOM_FIELD,
    extraProps: {
      isArray: true
    }
  }
]

const reportMeta: IReportMeta = {
  meta
}

export default reportMeta
