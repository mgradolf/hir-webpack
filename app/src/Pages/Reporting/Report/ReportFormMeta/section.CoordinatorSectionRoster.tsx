import { DATE_PICKERS, IField, TEXT } from "~/Component/Common/SearchForm/common"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Coordinator Name",
    inputType: TEXT,
    rules: [{ required: true, message: "Coordinator Name is Required" }],
    fieldName: "CoordinatorName"
  },
  {
    label: "Section Date",
    fieldName: "SectionAStartDate",
    fieldName2: "SectionEndDate",
    rules: [{ required: true, message: "Section Date is Required" }],
    inputType: DATE_PICKERS
  }
]

const reportMeta: IReportMeta = {
  meta
}

export default reportMeta
