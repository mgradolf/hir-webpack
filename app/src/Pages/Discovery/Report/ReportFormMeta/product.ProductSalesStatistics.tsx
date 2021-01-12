import { DATE_PICKERS, IFilterField } from "~/Component/Common/SearchFilters/common"

const meta: IFilterField[] = [
  {
    label: "Order Date",
    fieldName: "OrderDateFrom",
    fieldName2: "OrderDateTo",
    inputType: DATE_PICKERS
  }
]

export const mapping: { [key: string]: any } = {
  OrderDateFrom: "OrderDateFrom_DisplayOnly",
  OrderDateTo: "OrderDateTo_DisplayOnly"
}

export default meta
