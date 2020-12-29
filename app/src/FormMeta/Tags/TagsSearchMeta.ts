import { getTagTypes } from "~/ApiServices/Service/RefLookupService"
import { BOOLEAN, IFilterField, MULTI_SELECT_DROPDOWN, NUMBER, TEXT } from "~/Component/Common/SearchFilters/common"

export const getTagsSearchMeta = (EntityType: string, EntityID: number): IFilterField[] => [
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
  },
  {
    label: "Entity Type",
    inputType: TEXT,
    fieldName: "EntityType",
    defaultValue: EntityType,
    hidden: true
  },
  {
    label: "Entity ID",
    inputType: NUMBER,
    fieldName: "EntityID",
    defaultValue: EntityID,
    hidden: true
  }
]
