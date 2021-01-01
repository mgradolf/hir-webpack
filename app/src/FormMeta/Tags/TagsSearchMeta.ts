import { getTagTypes } from "~/ApiServices/Service/RefLookupService"
import { BOOLEAN, DROPDOWN, IFilterField, MULTI_SELECT_DROPDOWN, TEXT } from "~/Component/Common/SearchFilters/common"

export const TagsSearchMeta: IFilterField[] = [
  {
    label: "Entity Type",
    inputType: DROPDOWN,
    fieldName: "EntityType",
    options: [
      { label: "Offering", value: "Offering" },
      { label: "Section", value: "Section" },
      { label: "Program", value: "Program" },
      { label: "MarketingCode", value: "MarketingCode" }
    ],
    hidden: true
  },
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
    label: "Selected",
    inputType: BOOLEAN,
    fieldName: "IsSelected",
    defaultValue: true,
    hidden: true
  }
]
