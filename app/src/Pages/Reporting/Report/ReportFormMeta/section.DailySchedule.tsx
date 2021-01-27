import { DATE_PICKERS } from "~/Component/Common/SearchFilters/common"
import { IField } from "~/Component/Common/SearchForm/common"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Schedule For",
    fieldName: "date_start",
    fieldName2: "date_end",
    rules: [{ required: true, message: "Date Range is Required" }],
    inputType: DATE_PICKERS
  }
]

const reportMeta: IReportMeta = {
  meta,
  defaultFilter: {
    BalanceMoreThan: 0
  }
}

export default reportMeta
