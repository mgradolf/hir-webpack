import { DATE_PICKER, IField } from "~/Component/Common/Form/common"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Schedule For",
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
  defaultFormValue: {
    BalanceMoreThan: 0
  }
}

export default reportMeta
