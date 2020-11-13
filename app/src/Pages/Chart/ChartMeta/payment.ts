import moment from "moment"
import { analyzePaymentsByDate } from "~/ApiServices/BizApi/query/queryIf"
import { DATE_PICKERS, IFilterField } from "~/Component/Common/SearchFilters/common"
import { IChartConfig } from "~/Pages/Chart/ChartMeta/IChartConfig"
import { DATE_FORMAT } from "~/utils/Constants"

export const config: IChartConfig = {
  title: "Analyze Payments By Date",
  chartType: "simplebarchart",
  transFormerFunc: (data: any[]) => {
    return data.map((item) => {
      return {
        Date: moment(item["PaymentDate"]).format(DATE_FORMAT),
        PaymentAmount: item["PaymentAmount"]
      }
    })
  },
  xField: "Date",
  yField: "PaymentAmount"
}
export const searchFunc = () => analyzePaymentsByDate
export const meta: IFilterField[] = [
  {
    label: "Payment Date",
    inputType: DATE_PICKERS,

    fieldName: "PaymentDateFrom",
    ariaLabel: "Payment Date From",

    fieldName2: "PaymentDateTo",
    ariaLabel2: "Payment Date To"
  }
]
