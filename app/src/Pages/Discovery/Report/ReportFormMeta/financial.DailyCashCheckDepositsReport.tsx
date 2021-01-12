import { getOrganizations, getPaymentGatewayAccounts, getPaymentTypes } from "~/ApiServices/Service/RefLookupService"
import {
  DATE_PICKERS,
  DROPDOWN,
  IFilterField,
  MULTI_SELECT_DROPDOWN,
  TEXT
} from "~/Component/Common/SearchFilters/common"

const meta: IFilterField[] = [
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
    label: "Created By",
    inputType: TEXT,
    fieldName: "CreatedBy"
  },
  {
    label: "User Name",
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

export default meta

//  BeginDate
//  EndDate
//  OrganizationID
//  OrganizationName
//  OrganizationName
//  CreatedBy
//  UserName
//  PaymentGatewayAccountID
//  PaymentTypeID
