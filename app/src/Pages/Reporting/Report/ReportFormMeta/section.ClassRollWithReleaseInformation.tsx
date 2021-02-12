import { CUSTOM_FIELD, IField, DATE_PICKER } from "~/Component/Common/Form/common"

import { SectionLookup } from "~/Component/Common/Form/FormLookupFields/SectionLookup"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Section Number",
    fieldName: "SectionID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SectionLookup,
    extraProps: {
      isArray: true
    }
  },
  {
    label: "Meeting Date",
    fieldName: "FromMeetinglDate",
    inputType: DATE_PICKER
  }
]

const reportMeta: IReportMeta = {
  meta,
  mapping: {
    FromMeetinglDate: "ToMeetingDate"
  },
  atLeastOneRequiredfield: true
}

export default reportMeta
