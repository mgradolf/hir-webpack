import { getTagTypes } from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, IFilterField, MULTI_SELECT_DROPDOWN, TEXT } from "~/Component/Common/SearchFilters/common"

export const TagsSearchMeta: IFilterField[] = [
  {
    label: "Tag Type",
    inputType: MULTI_SELECT_DROPDOWN,
    fieldName: "TagTypeID",
    refLookupService: getTagTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Tag",
    inputType: TEXT,
    fieldName: "Tag"
  },
  {
    label: "Active",
    inputType: DROPDOWN,
    options: [
      { label: "Yes", value: "true" },
      { label: "No", value: "false" }
    ],
    fieldName: "IsActive",
    defaultValue: true
  }
]
