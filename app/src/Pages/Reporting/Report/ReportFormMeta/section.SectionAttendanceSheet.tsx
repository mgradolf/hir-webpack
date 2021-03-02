// import moment from "moment"
import { CUSTOM_FIELD, IField } from "~/Component/Common/Form/common"
import { SectionLookupWithScheduleDatePopulate } from "~/Component/Common/Form/CustomFormFields/SectionLookupWithScheduleDatePopulate"

import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"
// import { SectionLookup } from "~/Component/Common/Form/FormLookupFields/SectionLookup"
// import { DATE_FORMAT } from "~/utils/Constants"

const meta: IField[] = [
  {
    label: "Section",
    fieldName: "SectionID",
    rules: [{ required: true, message: "Section is Required" }],
    inputType: CUSTOM_FIELD,
    // customFilterComponent: SectionLookup
    customFilterComponent: SectionLookupWithScheduleDatePopulate
  }
  // {
  //   label: "Schedule Date",
  //   fieldName: "DateRangeStart",
  //   fieldName2: "DateRangeEnd",
  //   rules: [{ required: true, message: "Date field is Required" }],
  //   inputType: DATE_PICKERS
  // }
]

const reportMeta: IReportMeta = {
  meta
  // initialFormValue: {
  //   DateRangeEnd: moment().format(DATE_FORMAT)
  // }
}

export default reportMeta
