import { DATE_PICKERS, CUSTOM_FIELD, IField } from "~/Component/Common/SearchForm/common"

import { SearchSectionLookupButton } from "~/Component/Common/SearchForm/SearchLookups/SearchSectionLookup"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Section",
    fieldName: "SectionID",
    rules: [{ required: true, message: "Section is Required" }],
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchSectionLookupButton
  },
  {
    label: "Schedule Date",
    fieldName: "DateRangeStart",
    fieldName2: "DateRangeEnd",
    rules: [{ required: true, message: "Date field is Required" }],

    inputType: DATE_PICKERS
  }
]

const reportMeta: IReportMeta = {
  meta
}

export default reportMeta
