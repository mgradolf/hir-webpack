import { DATE_PICKER, IField } from "~/Component/Common/SearchForm/common"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Schedule For",
    fieldName: "date_start",
    rules: [{ required: true, message: "Date field is Required" }],

    inputType: DATE_PICKER
  }
]

const reportMeta: IReportMeta = {
  meta,
  defaultFilter: {
    BalanceMoreThan: 0
  },
  mapping: {
    date_start: "date_end"
  }
}

export default reportMeta
