import { CUSTOM_FIELD, IField, NUMBER } from "~/Component/Common/Form/common"
import { GLAccount } from "~/Component/Common/Form/CustomFormFields/GLAccount"

export const PackageFinancialFormMeta: IField[] = [
  {
    label: "GL Code",
    fieldName: "GLAccountID",
    fieldName2: "Description",
    inputType: CUSTOM_FIELD,
    customFilterComponent: GLAccount
  },
  {
    label: "Amount",
    inputType: NUMBER,
    fieldName: "Amount",
    rules: [{ required: true, message: "Please enter amount!" }]
  },
  {
    label: "Weight",
    inputType: NUMBER,
    fieldName: "Weight"
  }
]
