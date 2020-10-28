import {
  getBasePaymentTypes,
  getPaymentGatewayAccounts,
  getPaymentTypes,
  getSourceModule
} from "~/ApiServices/Service/RefLookupService"
import { DATE_PICKERS, DROPDOWN, IFilterField, NUMBER } from "~/Component/Common/SearchFilters/common"
import PersonSelector from "~/Component/Section/Order/PaymentFilters/PersonSelector"
import TotalAmountRange from "~/Component/Section/Order/PaymentFilters/TotalAmountRange"
import AccountLookup from "~/Component/Section/Order/PaymentFilters/AccountLookup"

export const PaymentsFiltersMeta: IFilterField[] = [
  {
    label: "Person Selector",
    fieldName: "",
    customFilterComponent: PersonSelector
  },
  {
    label: "Total Amount",
    fieldName: "",
    customFilterComponent: TotalAmountRange
  },
  {
    label: "Creation Date",
    inputType: DATE_PICKERS,
    displayKey: "From",
    defaultValue: "",
    fieldName: "CreateDateFrom",
    valueKey: "CreateDateFrom",
    ariaLabel: "Creation Date From",
    displayKey2: "To",
    valueKey2: "CreateDateTo",
    fieldName2: "CreateDateTo",
    ariaLabel2: "Creation Date To"
  },
  {
    label: "Order Id",
    inputType: NUMBER,
    defaultValue: "",
    fieldName: "OrderID",
    ariaLabel: "OrderID"
  },
  {
    label: "Payment Id",
    inputType: NUMBER,
    defaultValue: "",
    fieldName: "PaymentID",
    ariaLabel: "PaymentID"
  },
  {
    label: "Payment Types",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "PaymentTypeID",
    ariaLabel: "Payment Types",
    refLookupService: getPaymentTypes,
    displayKey: "PaymentAcceptedName",
    valueKey: "PaymentTypeID"
  },
  {
    label: "Base Paymment Type",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "BasePaymentTypeID",
    ariaLabel: "Base Paymment Type",
    refLookupService: getBasePaymentTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Source",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "SourceID",
    ariaLabel: "Source",
    refLookupService: getSourceModule,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Source",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "PaymentGatewayAccountID",
    ariaLabel: "Source",
    refLookupService: getPaymentGatewayAccounts,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Transaction Number",
    inputType: NUMBER,
    defaultValue: "",
    fieldName: "TransactionNumber",
    ariaLabel: "TransactionNumber"
  },
  {
    label: "Account Lookup",
    fieldName: "",
    customFilterComponent: AccountLookup
  }
]
