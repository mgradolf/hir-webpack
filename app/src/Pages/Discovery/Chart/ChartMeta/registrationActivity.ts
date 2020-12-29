import moment from "moment"
import { analyzeRegistrationActivityByDate } from "~/ApiServices/BizApi/query/queryIf"
import { DATE_PICKERS, IFilterField } from "~/Component/Common/SearchFilters/common"
import { IChartConfig } from "~/Pages/Discovery/Chart/ChartMeta/IChartConfig"
import { DATE_FORMAT } from "~/utils/Constants"

export const config: IChartConfig = {
  title: "Analyze Registration Activity By Date",
  chartType: "simplebarchart",
  transFormerFunc: (data: any[]) => {
    return data.map((item) => {
      return {
        Date: moment(item["StatusDate"]).format(DATE_FORMAT),
        Count: item["TotalCount"]
      }
    })
  },
  xField: "Date",
  yField: "Count"
}

export const searchFunc = () => analyzeRegistrationActivityByDate
export const title = "Analyze Registration Activity By Date"
export const meta: IFilterField[] = [
  {
    label: "Activity Date",
    inputType: DATE_PICKERS,

    fieldName: "StatusDateFrom",
    ariaLabel: "Activity Date From",

    fieldName2: "StatusDateTo",
    ariaLabel2: "Activity Date To"
  }
]
