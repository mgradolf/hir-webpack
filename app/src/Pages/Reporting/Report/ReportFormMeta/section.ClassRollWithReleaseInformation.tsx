import { DATE_PICKERS, CUSTOM_FIELD, IField } from "~/Component/Common/Form/common"

import { SectionLookup } from "~/Component/Common/Form/FormLookupFields/SectionLookup"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Section Number",
    fieldName: "SectionID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SectionLookup
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
