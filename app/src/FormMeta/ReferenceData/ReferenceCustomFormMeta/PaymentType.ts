import { getBasePaymentTypes, getGLAccountTypes } from "~/ApiServices/Service/RefLookupService"
import { BOOLEAN, DROPDOWN, IField, NUMBER, TEXT } from "~/Component/Common/Form/common"

export const FormMeta: IField[] = [
  {
    label: "Payment Method Name",
    fieldName: "PaymentAcceptedName",
    inputType: TEXT
  },
  {
    label: "GL Account",
    inputType: DROPDOWN,
    fieldName: "GLAccountID",
    refLookupService: getGLAccountTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Payment Base Type",
    inputType: DROPDOWN,
    fieldName: "GLAccountID",
    refLookupService: getBasePaymentTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Maximum Hours",
    fieldName: "MaxHours",
    inputType: NUMBER
  },
  {
    label: "Is Active",
    fieldName: "IsActive",
    inputType: BOOLEAN
  },
  {
    label: "Is Internal Only",
    fieldName: "IsInternalOnly",
    inputType: BOOLEAN
  }
]
