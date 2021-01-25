import { IFilterField } from "~/Component/Common/SearchFilters/common"
import { SearchProgramLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchProgramLookup"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IFilterField[] = [
  {
    label: "Selected Program",
    fieldName: "ProgramID",
    customFilterComponent: SearchProgramLookupButton
  }
]

const reportMeta: IReportMeta = {
  meta
}

export default reportMeta
