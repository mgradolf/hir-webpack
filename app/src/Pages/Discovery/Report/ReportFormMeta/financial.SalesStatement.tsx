import { DATE_PICKERS, DROPDOWN, IFilterField } from "~/Component/Common/SearchFilters/common"
import { SearchAccountLookup } from "~/Component/Common/SearchFilters/SearchLookups/SearchAccountLookup"

const meta: IFilterField[] = [
  {
    label: "AccountID",
    fieldName: "AccountID",
    customFilterComponent: SearchAccountLookup
  },
  {
    label: "Final Enrollment Date",
    fieldName: "OrderDateFrom",
    fieldName2: "OrderDateTo",
    inputType: DATE_PICKERS
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
      { label: "ascending", value: "Asc" },
      { label: "descending", value: "Desc" }
    ]
  }
]

export const mapping: { [key: string]: any } = {
  OrderDateFrom: "OrderDateFrom_DisplayOnly",
  OrderDateTo: "OrderDateTo_DisplayOnly"
}

export default meta
