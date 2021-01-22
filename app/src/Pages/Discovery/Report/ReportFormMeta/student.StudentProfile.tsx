import { IFilterField } from "~/Component/Common/SearchFilters/common"
import { SearchStudentLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchStudentLookup"
import { IReportMeta } from "~/Pages/Discovery/Report/IReportMeta"

const meta: IFilterField[] = [
  {
    label: "Student",
    fieldName: "StudentID",

    customFilterComponent: SearchStudentLookupButton
  }
]

const reportMeta: IReportMeta = {
  meta
}

export default reportMeta
