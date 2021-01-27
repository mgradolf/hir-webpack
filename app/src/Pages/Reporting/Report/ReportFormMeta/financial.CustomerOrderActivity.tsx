import { DATE_PICKERS, CUSTOM_FIELD, IField } from "~/Component/Common/SearchForm/common"

import { SearchPersonLookupButton } from "~/Component/Common/SearchForm/SearchLookups/SearchPersonLookup"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Person",
    fieldName: "PersonID",
    rules: [{ required: true, message: "Person is Required" }],
    customFilterComponent: SearchPersonLookupButton,
    inputType: CUSTOM_FIELD
  },
  {
    label: "Order Date",
    fieldName: "OrderDateFrom",
    fieldName2: "OrderDateTo",
    rules: [{ required: true, message: "Order Date is Required" }],
    inputType: DATE_PICKERS
  }
]

const reportMeta: IReportMeta = {
  meta
}

export default reportMeta
