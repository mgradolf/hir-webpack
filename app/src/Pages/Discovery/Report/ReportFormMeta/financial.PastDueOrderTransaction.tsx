import { BOOLEAN, DATE_PICKERS, IFilterField, NUMBER } from "~/Component/Common/SearchFilters/common"

const meta: IFilterField[] = [
  {
    label: "NumDays",
    inputType: NUMBER,
    fieldName: "NumDays"
  },
  {
    label: "Current Date",
    fieldName: "CurrentDate",
    inputType: DATE_PICKERS
  },
  {
    label: "ByOrderDate",
    fieldName: "ByOrderDate",
    inputType: BOOLEAN
  }
]

export default meta

// ByOrderDate
// CurrentDate
// NumDays
