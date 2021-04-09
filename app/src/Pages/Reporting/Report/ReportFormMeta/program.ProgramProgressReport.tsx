import { CUSTOM_FIELD, IField } from "~/Component/Common/Form/common"
import { ProgramEnrollmentLookup } from "~/Component/Common/Form/FormLookupFields/ProgramEnrollmentLookup"
import { IReportMeta } from "~/Pages/Reporting/Report/ReportMetaInterface"

const meta: IField[] = [
  {
    label: "Select Program Enrollment",
    fieldName: "ProgramEnrollmentID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: ProgramEnrollmentLookup,
    rules: [{ required: true, message: "Program Enrollment is Required" }]
  }
]

const reportMeta: IReportMeta = {
  meta,
  atLeastOneRequiredfield: true
}

export default reportMeta
