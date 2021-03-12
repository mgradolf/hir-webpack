import { IField, MULTI_RADIO, NUMBER } from "~/Component/Common/Form/common"
import { IReportMeta } from "~/Pages/Reporting/Report/ReportMetaInterface"

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
    rules: [{ required: true, message: "Due Date is Required" }],
    options: [
      { label: "Order Due Date", value: true },
      { label: "Item Due Date", value: false }
    ]
  }
]

const reportMeta: IReportMeta = {
  meta,
  initialFormValue: {
    ByOrderDate: true
  }
}

export default reportMeta
