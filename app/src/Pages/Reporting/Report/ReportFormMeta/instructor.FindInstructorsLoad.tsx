import { IFilterField } from "~/Component/Common/SearchFilters/common"
import { SearchInstructorLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchInstructorLookup"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IFilterField[] = [
  {
    label: "Faculty",
    fieldName: "FacultyID",
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
