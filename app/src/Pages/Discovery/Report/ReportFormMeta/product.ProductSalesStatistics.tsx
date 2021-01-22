import { DATE_PICKERS, IFilterField } from "~/Component/Common/SearchFilters/common"
import { IReportMeta } from "~/Pages/Discovery/Report/IReportMeta"

const meta: IFilterField[] = [
  {
    label: "Order Date",
    fieldName: "OrderDateFrom",
    fieldName2: "OrderDateTo",

    inputType: DATE_PICKERS
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
