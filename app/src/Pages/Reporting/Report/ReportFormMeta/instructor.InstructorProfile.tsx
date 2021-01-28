import { CUSTOM_FIELD, IField } from "~/Component/Common/Form/common"
import { SearchInstructorLookupButton } from "~/Component/Common/Form/SearchLookups/SearchInstructorLookup"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Faculty",
    rules: [{ required: true, message: "Faculty is Required" }],
    fieldName: "FacultyID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchInstructorLookupButton,
    extraProps: {
      isArray: true
    }
  }
]

const reportMeta: IReportMeta = {
  meta
}

export default reportMeta
