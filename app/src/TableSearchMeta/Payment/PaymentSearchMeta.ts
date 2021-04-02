import {
  getBasePaymentTypes,
  getOPCStatusCode,
  getPaymentGatewayAccounts,
  getPaymentTypes,
  getSourceModule
} from "~/ApiServices/Service/RefLookupService"
import { CUSTOM_FIELD, DATE_PICKERS, DROPDOWN, IField, NUMBER } from "~/Component/Common/Form/common"

import TotalAmountRange from "~/Component/Feature/Section/Order/TotalAmountRange"
import { AccountLookup } from "~/Component/Common/Form/FormLookupFields/AccountLookup"
import { FormFieldSelector } from "~/Component/Common/Form/FormFieldSelectors/FormFieldSelector"
import { PersonLookup } from "~/Component/Common/Form/FormLookupFields/PersonLookup"
import { StudentLookup } from "~/Component/Common/Form/FormLookupFields/StudentLookup"
import { SectionLookup } from "~/Component/Common/Form/FormLookupFields/SectionLookup"
import { OfferingLookupButton } from "~/Component/Common/Form/FormLookupFields/OfferingLookup"
import { FormInput } from "~/Component/Common/Form/FormInput"

export const PaymentSearchMeta: IField[] = [
  {
    label: "Person Selector",
    fieldName: "",
    inputType: CUSTOM_FIELD,
    customFilterComponent: FormFieldSelector,
    extraProps: {
      selectorKeys: [
        {
          label: "Payer",
          valueKey: "FirstName",
          fieldName: "PayerName",
          component: PersonLookup
        },
        {
          label: "Student",
          valueKey: "StudentName",
          fieldName: "FirstName",
          component: StudentLookup
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
    customFilterComponent: FormFieldSelector,
    extraProps: {
      selectorKeys: [
        {
          label: "Check",
          valueKey: "checkNumber",
          fieldName: "checkNumber",
          component: FormInput
        },
        {
          label: "Reference",
          valueKey: "TransactionNumber",
          fieldName: "TransactionNumber",
          component: FormInput
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
    customFilterComponent: AccountLookup
  },
  {
    label: "Student",
    fieldName: "StudentID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: StudentLookup
  },
  {
    label: "Offering",
    fieldName: "OfferingID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: OfferingLookupButton
  },
  {
    label: "Section",
    fieldName: "SectionID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SectionLookup
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
