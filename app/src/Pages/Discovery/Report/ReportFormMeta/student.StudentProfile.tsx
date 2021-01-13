import { IFilterField } from "~/Component/Common/SearchFilters/common"
import { SearchStudentLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchStudentLookup"

const meta: IFilterField[] = [
  {
    label: "Student",
    fieldName: "StudentID",
    customFilterComponent: SearchStudentLookupButton
  }
]

export default meta
