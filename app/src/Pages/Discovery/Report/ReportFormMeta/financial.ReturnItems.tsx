import { DATE_PICKERS, DROPDOWN, IField } from "~/Component/Common/SearchFilters/SearchForm/common"
import { IReportMeta } from "~/Pages/Discovery/Report/IReportMeta"

const meta: IField[] = [
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
      { label: "Order Number", value: "SortOrderID" },
      { label: "Last Name", value: "SortLastName" },
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

const reportMeta: IReportMeta = {
  meta,
  mapping: {
    OrderDateFrom: "OrderDateFrom_DisplayOnly",
    OrderDateTo: "OrderDateTo_DisplayOnly"
  }
}

export default reportMeta
