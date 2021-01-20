import { IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"

export const SectionTypeSearchMeta: IFilterField[] = [
  {
    label: "Type Name",
    inputType: TEXT,

    fieldName: "SectionTypeName",
    ariaLabel: "Type Name"
  }
]
