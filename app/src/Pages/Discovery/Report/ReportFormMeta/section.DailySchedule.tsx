import { DATE_PICKERS, IFilterField } from "~/Component/Common/SearchFilters/common"

const meta: IFilterField[] = [
  {
    label: "Schedule For",
    fieldName: "date_start",
    fieldName2: "date_end",
    inputType: DATE_PICKERS
  }
]

export default meta
