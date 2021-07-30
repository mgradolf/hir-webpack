import {
  getOfferingStatusTypes,
  getOrganizations,
  getPaymentGatewayAccounts
} from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, IField, TEXT, TEXTAREA } from "~/Component/Common/Form/common"

export const ProgramOfferingFormMeta: IField[] = [
  {
    label: "Program Offering Code",
    fieldName: "ProgramOfferingCode",
    inputType: TEXT,
    maxLength: 16,
    rules: [{ required: true, message: "Program Offering Code is required" }]
  },
  {
    label: "Program Offering Name",
    fieldName: "Name",
    inputType: TEXT,
    maxLength: 128,
    rules: [{ required: true, message: "Program Offering Name is required" }]
  },
  {
    label: "Description",
    fieldName: "Description",
    maxLength: 3000,
    inputType: TEXTAREA
  },
  {
    label: "Department",
    fieldName: "OrganizationID",
    inputType: DROPDOWN,
    refLookupService: getOrganizations,
    displayKey: "Name",
    valueKey: "OrganizationID"
  },
  {
    label: "Offering Status",
    inputType: DROPDOWN,
    fieldName: "ProgramOfferingStatusCodeID",
    refLookupService: getOfferingStatusTypes,
    displayKey: "Name",
    valueKey: "StatusID"
  },
  {
    label: "Selected Gateway",
    inputType: DROPDOWN,
    fieldName: "PaymentGatewayAccountID",
    refLookupService: getPaymentGatewayAccounts,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Default Gateway",
    inputType: DROPDOWN,
    fieldName: "DefaultPaymentGatewayAccountID",
    refLookupService: getPaymentGatewayAccounts,
    defaultValue: 8,
    disabled: true,
    displayKey: "Name",
    valueKey: "ID"
  }
]
