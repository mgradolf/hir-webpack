import { IField, TEXT } from "~/Component/Common/SearchForm/common"

export const SellerFulFillerSearchMeta: IField[] = [
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
