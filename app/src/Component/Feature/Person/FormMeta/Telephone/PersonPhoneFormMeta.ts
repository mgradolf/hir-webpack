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
    rules: [{ required: true, message: "Phone Type is required!" }]
  },
  {
    label: "Number",
    inputType: NUMBER,
    maxLength: 20,
    fieldName: "TelephoneNumber",
    rules: [{ required: true, message: "Phone Number is required!" }]
  },
  {
    label: "Private",
    inputType: DROPDOWN,
    fieldName: "IsConfidential",
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false }
    ]
  },
  {
    label: "Preferred",
    inputType: DROPDOWN,
    fieldName: "IsPreferred",
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false }
    ]
  }
]
