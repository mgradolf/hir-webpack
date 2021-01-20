import { IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"

export const BuildingTypeSearchMeta: IFilterField[] = [
  {
    label: "Building Name",
    inputType: TEXT,

    fieldName: "BuildingName",
    ariaLabel: "Building Name"
  },
  {
    label: "Site Name",
    inputType: TEXT,

    fieldName: "SiteName",
    ariaLabel: "Site Name"
  }
]
