import { IField, TEXT } from "~/Component/Common/Form/common"

export const PersonGovFormMeta: IField[] = [
  {
    label: "Title",
    inputType: TEXT,
    fieldName: "Title"
  },
  {
    label: "ERP",
    inputType: TEXT,
    fieldName: "ERPID"
  },
  {
    label: "SSN",
    inputType: TEXT,
    fieldName: "GovID"
  }
]
