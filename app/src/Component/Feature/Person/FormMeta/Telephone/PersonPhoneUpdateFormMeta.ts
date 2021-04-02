import { DROPDOWN, IField, NUMBER } from "~/Component/Common/Form/common"

export const PersonPhoneUpdateFormMeta: IField[] = [
  {
    label: "Number",
    inputType: NUMBER,
    fieldName: "TelephoneNumber",
    rules: [{ required: true, message: "Please enter telephone number!" }]
  },
  {
    label: "Phone is private",
    inputType: DROPDOWN,
    fieldName: "IsConfidential",
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false }
    ]
  }
]
