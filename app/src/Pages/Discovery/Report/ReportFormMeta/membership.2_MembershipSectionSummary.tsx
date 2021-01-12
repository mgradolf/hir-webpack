import { DATE_PICKERS, IFilterField } from "~/Component/Common/SearchFilters/common"

const meta: IFilterField[] = [
  {
    label: "Select Date",
    fieldName: "StartDate",
    fieldName2: "EndDate",
    inputType: DATE_PICKERS
  }
]
export const mapping: { [key: string]: any } = {
  StartDate: "DisplayStartDate",
  EndDate: "DisplayEndDate"
}

export default meta
