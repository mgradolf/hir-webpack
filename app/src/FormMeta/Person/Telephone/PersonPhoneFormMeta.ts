import { DROPDOWN, IField, NUMBER } from "~/Component/Common/Form/common"
import { getTelephoneType } from "~/ApiServices/Service/RefLookupService"

export const PersonPhoneFormMeta: IField[] = [
  {
    label: "Phone Type",
    inputType: DROPDOWN,
    refLookupService: getTelephoneType,
    fieldName: "TelephoneTypeID",
    displayKey: "Name",
    valueKey: "ID",
    rules: [{ required: true, message: "Please select telephone type!" }]
  },
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
