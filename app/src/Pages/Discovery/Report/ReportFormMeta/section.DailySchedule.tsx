import { DATE_PICKER, IField } from "~/Component/Common/SearchFilters/SearchForm/common"
import { IReportMeta } from "~/Pages/Discovery/Report/IReportMeta"

const meta: IField[] = [
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
