import moment from "moment"
import { DATE_PICKER, IField } from "~/Component/Common/Form/common"
import { IReportMeta } from "~/Pages/Reporting/Report/ReportMetaInterface"
import { DATE_FORMAT } from "~/utils/Constants"

const meta: IField[] = [
  {
    label: "Roster For",
    fieldName: "date_start",
    rules: [{ required: true, message: "Date Range is Required" }],
    inputType: DATE_PICKER
  }
]

const reportMeta: IReportMeta = {
  meta,
  mapping: {
    date_start: "date_end"
  },
  initialFormValue: {
    date_start: moment().format(DATE_FORMAT)
  }
}

export default reportMeta
