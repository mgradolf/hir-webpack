import { IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"

export const ResourceSearchMeta: IFilterField[] = [
  {
    label: "Name",
    inputType: TEXT,
    fieldName: "Name",
    ariaLabel: "Name"
  }
]
