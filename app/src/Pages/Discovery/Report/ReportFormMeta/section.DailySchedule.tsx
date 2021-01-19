import { DATE_PICKER, IFilterField } from "~/Component/Common/SearchFilters/common"

const meta: IFilterField[] = [
  {
    label: "Schedule For",
    fieldName: "date_start",
    inputType: DATE_PICKER
  }
]

export const mapping: { [key: string]: any } = {
  date_start: "date_end"
}

export default meta
