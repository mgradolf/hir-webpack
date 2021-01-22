import { getOrganizations, getPaymentGatewayAccounts, getPaymentTypes } from "~/ApiServices/Service/RefLookupService"
import {
  DATE_PICKERS,
  DROPDOWN,
  MULTI_SELECT_DROPDOWN,
  TEXT,
  IField
} from "~/Component/Common/SearchFilters/SearchForm/common"

import { IReportMeta } from "~/Pages/Discovery/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Select Date",
    fieldName: "BeginDate",
    fieldName2: "EndDate",

    inputType: DATE_PICKERS
  },
  {
    label: "Department",
    inputType: DROPDOWN,
    fieldName: "OrganizationID",
    refLookupService: getOrganizations,
    displayKey: "Name",
    valueKey: "OrganizationID"
  },
  {
    label: "User",
    inputType: TEXT,
    fieldName: "UserName"
  },
  {
    label: "Payment Gateway",
    inputType: DROPDOWN,
    fieldName: "PaymentGatewayAccountID",
    refLookupService: getPaymentGatewayAccounts,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Deposit Type",
    inputType: MULTI_SELECT_DROPDOWN,
    fieldName: "PaymentTypeID",
    refLookupService: getPaymentTypes,
    displayKey: "PaymentSchemaName",
    valueKey: "PaymentTypeID"
  }
]

const reportMeta: IReportMeta = {
  meta
}

export default reportMeta
