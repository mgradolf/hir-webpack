import { IFilterField } from "~/Component/Common/SearchFilters/common"
import { SearchProgramLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchProgramLookup"

const meta: IFilterField[] = [
  {
    label: "Selected Program",
    fieldName: "ProgramID",
    customFilterComponent: SearchProgramLookupButton
  }
]

export default meta
