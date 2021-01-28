import { DATE_PICKERS, CUSTOM_FIELD, IField } from "~/Component/Common/Form/common"

import { SearchSectionLookupButton } from "~/Component/Common/Form/SearchLookups/SearchSectionLookup"
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
