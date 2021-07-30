import { IField, TEXT } from "~/Component/Common/Form/common"

export const PersonGovFormMeta: IField[] = [
  {
    label: "ERP",
    inputType: TEXT,
    fieldName: "ERPID",
    maxLength: 50
  },
  {
    label: "SSN",
    inputType: TEXT,
    fieldName: "GovID",
    maxLength: 20
  }
]
