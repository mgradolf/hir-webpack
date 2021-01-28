import { DATE_PICKERS, DROPDOWN, CUSTOM_FIELD, IField } from "~/Component/Common/Form/common"
import { SearchAccountLookup } from "~/Component/Common/Form/SearchLookups/SearchAccountLookup"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Order Date",
    fieldName: "OrderDateFrom",
    fieldName2: "OrderDateTo",
    rules: [{ required: true, message: "Order Date is Required" }],
    inputType: DATE_PICKERS
  },
  {
    label: "Account",
    fieldName: "AccountID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchAccountLookup,
    rules: [{ required: true, message: "Account is Required" }]
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

const reportMeta: IReportMeta = {
  meta,
  mapping: {
    OrderDateFrom: "OrderDateFrom_DisplayOnly",
    OrderDateTo: "OrderDateTo_DisplayOnly"
  }
}

export default reportMeta
