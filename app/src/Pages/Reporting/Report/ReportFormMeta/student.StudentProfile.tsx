import { CUSTOM_FIELD, IField } from "~/Component/Common/SearchForm/common"
import { SearchStudentLookupButton } from "~/Component/Common/SearchForm/SearchLookups/SearchStudentLookup"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Student",
    fieldName: "StudentID",
    rules: [{ required: true, message: "Student is Required" }],
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchStudentLookupButton
  }
]

const reportMeta: IReportMeta = {
  meta
}

export default reportMeta
