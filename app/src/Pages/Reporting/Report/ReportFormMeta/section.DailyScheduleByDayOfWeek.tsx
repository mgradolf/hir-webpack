import { IField, MULTI_SELECT_DROPDOWN } from "~/Component/Common/Form/common"
import { IReportMeta } from "~/Pages/Reporting/Report/ReportMetaInterface"
import { generateMMDDYY } from "~/utils/MMDDYYGenerator"

const meta: IField[] = [
  {
    label: "Weekdays",
    fieldName: "date_start",
    inputType: MULTI_SELECT_DROPDOWN,
    options: [
      { label: "Monday", value: "2" },
      { label: "Tuesday", value: "3" },
      { label: "Wednesday", value: "4" },
      { label: "Thursday", value: "5" },
      { label: "Friday", value: "6" },
      { label: "Saturday", value: "7" },
      { label: "Sunday", value: "1" }
    ],
    rules: [{ required: true, message: "Weekday(s) is/are Required" }]
  }
]

const reportMeta: IReportMeta = {
  meta,
  defaultFormValue: {
    BalanceMoreThan: 0,
    current_date: generateMMDDYY(new Date())
  }
}

export default reportMeta
