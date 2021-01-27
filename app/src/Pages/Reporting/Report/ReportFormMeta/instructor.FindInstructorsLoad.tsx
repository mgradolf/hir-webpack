import { CUSTOM_FIELD, IField } from "~/Component/Common/SearchForm/common"
import { SearchInstructorLookupButton } from "~/Component/Common/SearchForm/SearchLookups/SearchInstructorLookup"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Faculty",
    fieldName: "FacultyID",
    rules: [{ required: true, message: "Faculty is Required" }],
    customFilterComponent: SearchInstructorLookupButton,
    inputType: CUSTOM_FIELD,
    extraProps: {
      isArray: true
    }
  }
]

const reportMeta: IReportMeta = {
  meta
}

export default reportMeta
