import {
  getBasePaymentTypes,
  getOPCStatusCode,
  getPaymentGatewayAccounts,
  getPaymentTypes,
  getSourceModule
} from "~/ApiServices/Service/RefLookupService"
import { DATE_PICKERS, DROPDOWN, IFilterField, NUMBER } from "~/Component/Common/SearchFilters/common"

import TotalAmountRange from "~/Component/Section/Order/TotalAmountRange"
import { SearchAccountLookup } from "~/Component/Common/SearchFilters/SearchLookups/SearchAccountLookup"
import { SearchLookupSelector } from "~/Component/Common/SearchFilters/SearchSelectors/SearchComponentSelector"
import { SearchPersonLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchPersonLookup"
import { SearchStudentLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchStudentLookup"
import { SearchSectionLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchSectionLookup"
import { SearchOfferingLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchOfferingLookup"
import { SearchInputType } from "~/Component/Common/SearchFilters/SearchInput"

export const PaymentSearchMeta: IFilterField[] = [
  // {
  //   label: "Payer",
  //   fieldName: "PersonID",
  //   customFilterComponent: SearchPersonLookupButton
  // },
  {
    label: "Person Selector",
    fieldName: "",
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
    ariaLabel: "Creation Date From",
    displayKey2: "To",
    valueKey2: "CreateDateTo",
    fieldName2: "CreateDateTo",
    ariaLabel2: "Creation Date To"
  },
  {
    label: "Check/ Reference",
    fieldName: "",
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
  // {
  //   label: "Check",
  //   inputType: TEXT,
  //   fieldName: "checkNumber",
  //   ariaLabel: "checkNumber"
  // },
  // {
  //   label: "Reference",
  //   inputType: TEXT,
  //   fieldName: "TransactionNumber",
  //   ariaLabel: "TransactionNumber"
  // },
  {
    label: "Payment ID",
    inputType: NUMBER,
    fieldName: "PaymentID",
    ariaLabel: "PaymentID"
  },
  {
    label: "Order ID",
    inputType: NUMBER,
    fieldName: "OrderID",
    ariaLabel: "OrderID"
  },
  {
    label: "Account Lookup",
    fieldName: "AccountID",
    customFilterComponent: SearchAccountLookup
  },
  {
    label: "Student",
    fieldName: "StudentID",
    customFilterComponent: SearchStudentLookupButton
  },
  {
    label: "Offering",
    fieldName: "OfferingID",
    customFilterComponent: SearchOfferingLookupButton
  },
  {
    label: "Section",
    fieldName: "SectionID",
    customFilterComponent: SearchSectionLookupButton
  },
  {
    label: "Payment Amount",
    fieldName: "TotalAmountFrom",
    fieldName2: "TotalAmountTo",
    customFilterComponent: TotalAmountRange
  },
  {
    label: "Base Paymment Type",
    inputType: DROPDOWN,
    fieldName: "BasePaymentTypeID",
    ariaLabel: "Base Paymment Type",
    refLookupService: getBasePaymentTypes,
    displayKey: "Name",
    valueKey: "ID"
  },

  {
    label: "Payment Types",
    inputType: DROPDOWN,
    fieldName: "PaymentTypeID",
    ariaLabel: "Payment Types",
    refLookupService: getPaymentTypes,
    displayKey: "PaymentAcceptedName",
    valueKey: "PaymentTypeID"
  },
  {
    label: "Source",
    inputType: DROPDOWN,

    fieldName: "SourceID",
    ariaLabel: "Source",
    refLookupService: getSourceModule,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Gateway",
    inputType: DROPDOWN,

    fieldName: "PaymentGatewayAccountID",
    ariaLabel: "Gateway",
    refLookupService: getPaymentGatewayAccounts,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Payment Status",
    inputType: DROPDOWN,

    fieldName: "PaymentStatusID",
    ariaLabel: "Payment Status",
    refLookupService: getOPCStatusCode,
    displayKey: "Name",
    valueKey: "StatusID"
  }
]
