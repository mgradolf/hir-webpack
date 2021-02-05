import { IField, MULTI_SELECT_DROPDOWN } from "~/Component/Common/Form/common"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"
import { generateMMDDYY } from "~/utils/MMDDYYGenerator"

const meta: IField[] = [
  {
    label: "Weekdays",
    fieldName: "date_start",
    inputType: MULTI_SELECT_DROPDOWN,
    options: [
      { label: "Monday", value: "1" },
      { label: "Tuesday", value: "2" },
      { label: "Wednesday", value: "3" },
      { label: "Thursday", value: "4" },
      { label: "Friday", value: "5" },
      { label: "Saturday", value: "6" },
      { label: "Sunday", value: "7" }
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
