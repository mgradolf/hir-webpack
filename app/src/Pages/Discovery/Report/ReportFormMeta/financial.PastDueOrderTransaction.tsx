import { BOOLEAN, DATE_PICKERS, IFilterField, NUMBER } from "~/Component/Common/SearchFilters/common"
import { IReportMeta } from "~/Pages/Discovery/Report/IReportMeta"

const meta: IFilterField[] = [
  {
    label: "NumDays",
    inputType: NUMBER,
    fieldName: "NumDays"
  },
  {
    label: "Current Date",
    fieldName: "CurrentDate",
    inputType: DATE_PICKERS
  },
  {
    label: "ByOrderDate",
    fieldName: "ByOrderDate",
    inputType: BOOLEAN
  }
]

const reportMeta: IReportMeta = {
  meta
}

export default reportMeta

// ByOrderDate
// CurrentDate
// NumDays
