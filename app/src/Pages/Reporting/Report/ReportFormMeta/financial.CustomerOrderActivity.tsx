import { DATE_PICKERS, CUSTOM_FIELD, IField } from "~/Component/Common/SearchFilters/SearchForm/common"

import { SearchPersonLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchPersonLookup"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Person",
    fieldName: "PersonID",
    customFilterComponent: SearchPersonLookupButton,
    inputType: CUSTOM_FIELD
  },
  {
    label: "Order Date",
    fieldName: "OrderDateFrom",
    fieldName2: "OrderDateTo",
    rules: [{ required: true, message: "Date field is Required" }],
    inputType: DATE_PICKERS
  }
]

const reportMeta: IReportMeta = {
  meta
}

export default reportMeta
