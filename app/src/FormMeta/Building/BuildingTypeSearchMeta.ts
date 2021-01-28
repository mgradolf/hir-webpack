import { IField, TEXT } from "~/Component/Common/SearchForm/common"

export const BuildingTypeSearchMeta: IField[] = [
  {
    label: "Building Name",
    inputType: TEXT,
    fieldName: "BuildingName"
  },
  {
    label: "Site Name",
    inputType: TEXT,
    fieldName: "SiteName"
  }
]
