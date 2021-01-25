import { DATE_PICKERS, CUSTOM_FIELD, IField } from "~/Component/Common/SearchFilters/SearchForm/common"

import { SearchSectionLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchSectionLookup"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Section Number",
    fieldName: "SectionID",
    customFilterComponent: SearchSectionLookupButton,
    inputType: CUSTOM_FIELD
  },
  {
    label: "Meeting Date",

    fieldName: "FromMeetinglDate",
    fieldName2: "ToMeetingDate",
    rules: [{ required: true, message: "Date field is Required" }],
    inputType: DATE_PICKERS
  }
]

const reportMeta: IReportMeta = {
  meta
}

export default reportMeta
