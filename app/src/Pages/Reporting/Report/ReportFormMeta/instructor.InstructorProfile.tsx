import { CUSTOM_FIELD, IField } from "~/Component/Common/SearchFilters/SearchForm/common"
import { SearchInstructorLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchInstructorLookup"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Faculty",

    fieldName: "FacultyID",
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
