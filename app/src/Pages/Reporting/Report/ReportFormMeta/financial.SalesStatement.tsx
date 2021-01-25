import { DATE_PICKERS, DROPDOWN, IField } from "~/Component/Common/SearchFilters/SearchForm/common"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Final Enrollment Date",
    rules: [{ required: true, message: "Date field is Required" }],

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

const reportMeta: IReportMeta = {
  meta,
  mapping: {
    OrderDateFrom: "OrderDateFrom_DisplayOnly",
    OrderDateTo: "OrderDateTo_DisplayOnly"
  }
}

export default reportMeta
