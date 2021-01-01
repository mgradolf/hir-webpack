import { getTagTypes } from "~/ApiServices/Service/RefLookupService"
import { BOOLEAN, IFilterField, MULTI_SELECT_DROPDOWN, TEXT } from "~/Component/Common/SearchFilters/common"

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
    inputType: BOOLEAN,
    fieldName: "IsActive",
    defaultValue: true
  }
]
