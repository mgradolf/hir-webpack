import { CUSTOM_FIELD, DROPDOWN, IField, TEXT } from "~/Component/Common/Form/common"
import { getAccountTypes } from "~/ApiServices/Service/RefLookupService"
import { AccountLookup } from "~/Component/Common/Form/FormLookupFields/AccountLookup"

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
    label: "Primary Contact",
    fieldName: "PrimaryAccountAffiliationID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: AccountLookup
  },
  {
    label: "Account Name",
    inputType: TEXT,
    fieldName: "Name",
    rules: [{ required: true, message: "Please enter account name!" }]
  },
  {
    label: "Payment Term",
    inputType: TEXT,
    fieldName: "PaymentTerm"
  },
  {
    label: "Allow To Pay Later",
    inputType: DROPDOWN,
    options: [
      { label: "Pay Later", value: "Pay Later" },
      { label: "Purchase Order", value: "Purchase Order" },
      { label: "Not Allowed", value: "Not Allowed" }
    ],
    fieldName: "AllowToPayLater"
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
  },
  {
    label: "Tax ID",
    inputType: TEXT,
    fieldName: "FEID"
  }
]
