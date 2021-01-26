import { CUSTOM_FIELD, IField } from "~/Component/Common/SearchForm/common"
import { SearchProgramLookupButton } from "~/Component/Common/SearchForm/SearchLookups/SearchProgramLookup"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Selected Program",
    fieldName: "ProgramID",
    customFilterComponent: SearchProgramLookupButton,
    inputType: CUSTOM_FIELD
  }
]

const reportMeta: IReportMeta = {
  meta
}

export default reportMeta
