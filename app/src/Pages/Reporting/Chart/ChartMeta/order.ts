import moment from "moment"
import { analyzeOrdersByDate } from "~/ApiServices/BizApi/query/queryIf"
import { DATE_PICKERS, IField } from "~/Component/Common/SearchForm/common"
import { IChartConfig } from "~/Pages/Reporting/Chart/ChartMeta/IChartConfig"
import { DATE_FORMAT } from "~/utils/Constants"

export const config: IChartConfig = {
  title: "Analyze Orders By Date",
  chartType: "simplebarchart",
  transFormerFunc: (data: any[]) => {
    return data.map((item) => {
      return {
        Date: moment(item["OrderDate"]).format(DATE_FORMAT),
        "Order Amount": item["OrderAmount"]
      }
    })
  },
  xField: "Date",
  yField: "Order Amount"
}
export const searchFunc = () => analyzeOrdersByDate
export const meta: IField[] = [
  {
    label: "Order Date",
    inputType: DATE_PICKERS,

    fieldName: "OrderDateFrom",
    ariaLabel: "Order Date From",

    fieldName2: "OrderDateTo",
    ariaLabel2: "Order Date To"
  }
]
