import { DATE_PICKERS, DROPDOWN, IFilterField } from "~/Component/Common/SearchFilters/common"
import { SearchAccountLookup } from "~/Component/Common/SearchFilters/SearchLookups/SearchAccountLookup"

const meta: IFilterField[] = [
  {
    label: "Order Date",
    fieldName: "OrderDateFrom",
    fieldName2: "OrderDateTo",
    inputType: DATE_PICKERS
  },
  {
    label: "Account",
    fieldName: "AccountID",
    customFilterComponent: SearchAccountLookup
  },
  {
    label: "Sort By",
    inputType: DROPDOWN,
    fieldName: "SortByColumn",
    options: [
      { label: "Sale Amount", value: "SortAmount" },
      { label: "Last Name", value: "SortLastName" },
      { label: "Order Number", value: "SortOrderID" },
      { label: "Order Date", value: "SortOrderDate" }
    ]
  },
  {
    label: "Sort Order",
    inputType: DROPDOWN,
    fieldName: "SortOrder",
    options: [
      { label: "Ascending", value: "Asc" },
      { label: "Descending", value: "Desc" }
    ]
  }
]
export const mapping: { [key: string]: any } = {
  OrderDateFrom: "OrderDateFrom_DisplayOnly",
  OrderDateTo: "OrderDateTo_DisplayOnly"
}

export default meta
