import { IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"

export const MarketingProgramSearchMeta: IFilterField[] = [
  {
    label: "Market Source",
    inputType: TEXT,
    fieldName: "MarketSource",
    ariaLabel: "Name"
  }
]
