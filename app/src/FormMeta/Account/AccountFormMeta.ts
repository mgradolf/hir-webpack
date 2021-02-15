import { DROPDOWN, IField, TEXT } from "~/Component/Common/Form/common"
import { getAccountTypes } from "~/ApiServices/Service/RefLookupService"

export const AccountFormMeta: IField[] = [
  {
    label: "Account Type",
    inputType: DROPDOWN,
    fieldName: "AccountTypeID",
    refLookupService: getAccountTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Account Name",
    inputType: TEXT,
    fieldName: "Name"
  },
  {
    label: "Payment Term",
    inputType: TEXT,
    fieldName: "PaymentTerm"
  },
  {
    label: "Allow To Pay Later",
    inputType: DROPDOWN,
    fieldName: "AllowToPayLater",
    options: [
      { label: "Not Allowed", value: "Not Allowed" },
      { label: "Pay Later", value: "Pay Later" },
      { label: "Purchase Order", value: "Purchase Order" }
    ]
  },
  {
    label: "Public",
    inputType: DROPDOWN,
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false }
    ],
    fieldName: "IsPublic"
  },
  {
    label: "Approval Required",
    inputType: DROPDOWN,
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false }
    ],
    fieldName: "IsApprovalRequired"
  }
]
