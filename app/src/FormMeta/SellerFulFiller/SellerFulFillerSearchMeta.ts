import { IFilterFieldObject, TEXT } from "~/Component/Common/SearchFilters/common"

export const SellerFulFillerSearchMeta: IFilterFieldObject[] = [
  {
    label: "Name",
    inputType: TEXT,
    fieldName: "Name"
  },
  {
    label: "Description",
    inputType: TEXT,
    defaultValue: "*",
    fieldName: "Description"
  }
]
