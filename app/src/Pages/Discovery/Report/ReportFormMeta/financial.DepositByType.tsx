import { getBasePaymentTypes, getPaymentGatewayAccounts } from "~/ApiServices/Service/RefLookupService"
import { DATE_PICKERS, DROPDOWN, IFilterField } from "~/Component/Common/SearchFilters/common"

const meta: IFilterField[] = [
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
  }
]

export default meta

// BasePaymentTypeID
// CreateDateFrom
// CreateDateTo
// PaymentTypeID
// PaymentGatewayAccountID
