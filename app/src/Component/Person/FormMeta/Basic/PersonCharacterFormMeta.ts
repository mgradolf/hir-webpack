import { getEthnicityTypes } from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, IField, MULTI_SELECT_CHECKBOX } from "~/Component/Common/Form/common"

export const PersonCharacterFormMeta: IField[] = [
  {
    label: "Ethnicity",
    inputType: MULTI_SELECT_CHECKBOX,
    fieldName: "EthnicityTypeIDs",
    refLookupService: getEthnicityTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Can Defer Payment",
    inputType: DROPDOWN,
    options: [
      { label: "Default", value: "Default" },
      { label: "Section", value: "Section" }
    ],
    fieldName: "CanDeferPayment"
  },
  {
    label: "Personal Information is Private",
    inputType: DROPDOWN,
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false }
    ],
    fieldName: "IsConfidential"
  }
]
