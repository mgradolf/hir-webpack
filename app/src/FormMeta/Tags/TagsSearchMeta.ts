import { getTagTypes } from "~/ApiServices/Service/RefLookupService"
import { BOOLEAN, DROPDOWN, IFilterFieldObject, NUMBER, TEXT } from "~/Component/Common/SearchFilters/common"

export const getTagsSearchMeta = (EntityType: string, EntityID: number): IFilterFieldObject[] => [
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
  },
  {
    label: "Tag Type",
    inputType: DROPDOWN,
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
    fieldName: "IsSelected"
  }
]
