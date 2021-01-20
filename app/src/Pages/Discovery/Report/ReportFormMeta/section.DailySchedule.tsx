import { DATE_PICKER, IFilterField } from "~/Component/Common/SearchFilters/common"
import { IReportMeta } from "~/Pages/Discovery/Report/IReportMeta"

const meta: IFilterField[] = [
  {
    label: "Schedule For",
    fieldName: "date_start",
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
