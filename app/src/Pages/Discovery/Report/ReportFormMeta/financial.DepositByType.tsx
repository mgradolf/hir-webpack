import { getBasePaymentTypes, getPaymentGatewayAccounts, getPaymentTypes } from "~/ApiServices/Service/RefLookupService"
import {
  DATE_PICKERS,
  DROPDOWN,
  MULTI_SELECT_DROPDOWN,
  IField
} from "~/Component/Common/SearchFilters/SearchForm/common"
import { IReportMeta } from "~/Pages/Discovery/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Payment Base Type",
    inputType: DROPDOWN,
    fieldName: "BasePaymentTypeID",
    refLookupService: getBasePaymentTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Select Date",
    fieldName: "CreateDateFrom",
    fieldName2: "CreateDateTo",
    inputType: DATE_PICKERS
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
