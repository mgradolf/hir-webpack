import { BOOLEAN, DATE_PICKERS, IField, NUMBER } from "~/Component/Common/Form/common"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IField[] = [
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
