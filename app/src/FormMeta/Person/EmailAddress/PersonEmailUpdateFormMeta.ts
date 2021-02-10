import { DROPDOWN, IField, TEXT } from "~/Component/Common/Form/common"

export const PersonEmailUpdateFormMeta: IField[] = [
  {
    label: "Email Address",
    inputType: TEXT,
    fieldName: "EmailAddress",
    rules: [{ required: true, message: "Please enter email address!" }]
  },
  {
    label: "Email address is private",
    inputType: DROPDOWN,
    fieldName: "IsConfidential",
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false }
    ]
  }
]
