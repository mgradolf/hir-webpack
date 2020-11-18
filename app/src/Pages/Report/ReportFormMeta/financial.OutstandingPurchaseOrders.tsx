import { DATE_PICKERS, IFilterField } from "~/Component/Common/SearchFilters/common"

const meta: IFilterField[] = [
  {
    label: "Order Date",
    inputType: DATE_PICKERS,

    fieldName: "OrderDateFrom",
    ariaLabel: "Order Date From",

    fieldName2: "OrderDateTo",
    ariaLabel2: "Order Date To"
  }
]

export default meta
