import { IField, MULTI_RADIO, NUMBER } from "~/Component/Common/Form/common"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Past Due Over(Days)",
    inputType: NUMBER,
    fieldName: "PastDueAge"
  },
  {
    label: "Due Date",
    inputType: MULTI_RADIO,
    fieldName: "ByOrderDate",
    options: [
      { label: "Order Due Date", value: true },
      { label: "Item Due Date", value: false }
    ]
  }
]

const reportMeta: IReportMeta = {
  meta,
  initialFormValue: {
    CurrentDate: true
  }
}

export default reportMeta
