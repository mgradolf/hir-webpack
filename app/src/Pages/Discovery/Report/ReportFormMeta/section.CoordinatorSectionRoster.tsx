import { DATE_PICKERS, IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"

const meta: IFilterField[] = [
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

export default meta
