import { DATE_PICKERS, DROPDOWN, IFilterField } from "~/Component/Common/SearchFilters/common"

const meta: IFilterField[] = [
  {
    label: "Order Date",
    inputType: DATE_PICKERS,
    fieldName: "OrderDateFrom",
    fieldName2: "OrderDateTo"
  },
  {
    label: "Sort By",
    inputType: DROPDOWN,
    fieldName: "SortByColumn",
    options: [
      { label: "Order Number", value: "true" },
      { label: "Last Name", value: "false" },
      { label: "Order Date", value: "false" }
    ]
  },
  {
    label: "Sort Order",
    inputType: DROPDOWN,
    fieldName: "SortOrder",
    options: [
      { label: "Ascending", value: "true" },
      { label: "Descending", value: "false" }
    ]
  }
]

export default meta

// OrderDateFrom
// OrderDateTo
// SortByColumn
// SortOrder
