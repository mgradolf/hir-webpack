import { DATE_PICKERS, IField, TEXT } from "~/Component/Common/SearchFilters/SearchForm/common"
import { IReportMeta } from "~/Pages/Discovery/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Coordinator Name",
    inputType: TEXT,
    fieldName: "CoordinatorName"
  },
  {
    label: "Section Date",
    fieldName: "SectionAStartDate",
    fieldName2: "SectionEndDate",
    inputType: DATE_PICKERS
  }
]

const reportMeta: IReportMeta = {
  meta
}

export default reportMeta
