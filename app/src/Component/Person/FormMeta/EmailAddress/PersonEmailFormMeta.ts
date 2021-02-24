import { DROPDOWN, IField, TEXT } from "~/Component/Common/Form/common"
import { getEmailType } from "~/ApiServices/Service/RefLookupService"

export const PersonEmailFormMeta: IField[] = [
  {
    label: "Address Type",
    inputType: DROPDOWN,
    refLookupService: getEmailType,
    fieldName: "EmailAddressTypeID",
    displayKey: "Name",
    valueKey: "ID",
    rules: [{ required: true, message: "Please select email address type!" }]
  },
  {
    label: "Email Address",
    inputType: TEXT,
    fieldName: "EmailAddress",
    rules: [{ required: true, message: "Please enter valid email address!", type: "email" }]
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
