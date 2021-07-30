import { DROPDOWN, IField, TEXT } from "~/Component/Common/Form/common"
import { getSecretQuestionType } from "~/ApiServices/Service/RefLookupService"

export const PersonLoginFormMeta: IField[] = [
  {
    label: "User Name",
    inputType: TEXT,
    fieldName: "UserLogin",
    maxLength: 255
  },
  {
    label: "Active",
    inputType: DROPDOWN,
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false }
    ],
    fieldName: "IsActivated"
  },
  {
    label: "Secret Question",
    inputType: DROPDOWN,
    fieldName: "SecretQuestion",
    refLookupService: getSecretQuestionType,
    displayKey: "Name",
    valueKey: "Name"
  },
  {
    label: "Secret Answer",
    inputType: TEXT,
    fieldName: "SecretAnswer",
    maxLength: 36
  }
]
