import moment from "moment"
import { DATE_PICKERS, IField, TEXT } from "~/Component/Common/Form/common"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"
import { DATE_FORMAT } from "~/utils/Constants"

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
  meta,
  initialFormValue: {
    SectionAStartDate: "",
    SectionEndDate: moment().format(DATE_FORMAT)
  }
}

export default reportMeta
