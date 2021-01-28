import { DATE_PICKERS, CUSTOM_FIELD, IField } from "~/Component/Common/SearchForm/common"

import { SearchSectionLookupButton } from "~/Component/Common/SearchForm/SearchLookups/SearchSectionLookup"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Section Number",
    fieldName: "SectionID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchSectionLookupButton
  },
  {
    label: "Meeting Date",
    rules: [{ required: true, message: "Date field is Required" }],

    fieldName: "FromMeetinglDate",
    fieldName2: "ToMeetingDate",
    inputType: DATE_PICKERS
  }
]

const reportMeta: IReportMeta = {
  meta
}

export default reportMeta
