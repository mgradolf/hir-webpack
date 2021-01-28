import { DATE_PICKERS, CUSTOM_FIELD, IField } from "~/Component/Common/Form/common"

import { SearchPersonLookupButton } from "~/Component/Common/Form/SearchLookups/SearchPersonLookup"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Person",
    fieldName: "PersonID",
    rules: [{ required: true, message: "Person is Required" }],
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchPersonLookupButton
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
