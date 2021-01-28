import {
  getBasePaymentTypes,
  getOPCStatusCode,
  getPaymentGatewayAccounts,
  getPaymentTypes,
  getSourceModule
} from "~/ApiServices/Service/RefLookupService"
import { CUSTOM_FIELD, DATE_PICKERS, DROPDOWN, IField, NUMBER } from "~/Component/Common/Form/common"

import TotalAmountRange from "~/Component/Section/Order/TotalAmountRange"
import { SearchAccountLookup } from "~/Component/Common/Form/SearchLookups/SearchAccountLookup"
import { SearchLookupSelector } from "~/Component/Common/Form/SearchSelectors/SearchComponentSelector"
import { SearchPersonLookupButton } from "~/Component/Common/Form/SearchLookups/SearchPersonLookup"
import { SearchStudentLookupButton } from "~/Component/Common/Form/SearchLookups/SearchStudentLookup"
import { SearchSectionLookupButton } from "~/Component/Common/Form/SearchLookups/SearchSectionLookup"
import { SearchOfferingLookupButton } from "~/Component/Common/Form/SearchLookups/SearchOfferingLookup"
import { SearchInputType } from "~/Component/Common/Form/SearchInput"

export const PaymentSearchMeta: IField[] = [
  {
    label: "Person Selector",
    fieldName: "",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchLookupSelector,
    extraProps: {
      selectorKeys: [
        {
          label: "Payer",
          valueField: "FirstName",
          fieldName: "PayerName",
          component: SearchPersonLookupButton
        },
        {
          label: "Student",
          valueField: "StudentName",
          fieldName: "FirstName",
          component: SearchStudentLookupButton
        }
      ]
    }
  },
  {
    label: "Payment Date",
    inputType: DATE_PICKERS,
    displayKey: "From",
    fieldName: "CreateDateFrom",
    valueKey: "CreateDateFrom",
    displayKey2: "To",
    valueKey2: "CreateDateTo",
    fieldName2: "CreateDateTo"
  },
  {
    label: "Check/ Reference",
    fieldName: "",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchLookupSelector,
    extraProps: {
      selectorKeys: [
        {
          label: "Check",
          valueField: "checkNumber",
          fieldName: "checkNumber",
          component: SearchInputType
        },
        {
          label: "Reference",
          valueField: "TransactionNumber",
          fieldName: "TransactionNumber",
          component: SearchInputType
        }
      ]
    }
  },

  {
    label: "Payment ID",
    inputType: NUMBER,
    fieldName: "PaymentID"
  },
  {
    label: "Order ID",
    inputType: NUMBER,
    fieldName: "OrderID"
  },
  {
    label: "Account Lookup",
    fieldName: "AccountID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchAccountLookup
  },
  {
    label: "Student",
    fieldName: "StudentID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchStudentLookupButton
  },
  {
    label: "Offering",
    fieldName: "OfferingID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchOfferingLookupButton
  },
  {
    label: "Section",
    fieldName: "SectionID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchSectionLookupButton
  },
  {
    label: "Payment Amount",
    fieldName: "TotalAmountFrom",
    fieldName2: "TotalAmountTo",
    inputType: CUSTOM_FIELD,
    customFilterComponent: TotalAmountRange
  },
  {
    label: "Base Paymment Type",
    inputType: DROPDOWN,
    fieldName: "BasePaymentTypeID",
    refLookupService: getBasePaymentTypes,
    displayKey: "Name",
    valueKey: "ID"
  },

  {
    label: "Payment Types",
    inputType: DROPDOWN,
    fieldName: "PaymentTypeID",
    refLookupService: getPaymentTypes,
    displayKey: "PaymentAcceptedName",
    valueKey: "PaymentTypeID"
  },
  {
    label: "Source",
    inputType: DROPDOWN,
    fieldName: "SourceID",
    refLookupService: getSourceModule,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Gateway",
    inputType: DROPDOWN,
    fieldName: "PaymentGatewayAccountID",
    refLookupService: getPaymentGatewayAccounts,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Payment Status",
    inputType: DROPDOWN,
    fieldName: "PaymentStatusID",
    refLookupService: getOPCStatusCode,
    displayKey: "Name",
    valueKey: "StatusID"
  }
]
