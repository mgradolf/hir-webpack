import { CUSTOM_FIELD, DATE_PICKERS, DROPDOWN, IField, NUMBER, TEXT } from "~/Component/Common/SearchForm/common"
import { SearchAccountLookup } from "~/Component/Common/SearchForm/SearchLookups/SearchAccountLookup"
import { SearchPersonLookupButton } from "~/Component/Common/SearchForm/SearchLookups/SearchPersonLookup"
import { SearchSectionLookupButton } from "~/Component/Common/SearchForm/SearchLookups/SearchSectionLookup"
import { SearchStudentLookupButton } from "~/Component/Common/SearchForm/SearchLookups/SearchStudentLookup"
import { SearchLookupSelector } from "~/Component/Common/SearchForm/SearchSelectors/SearchComponentSelector"
import { SearchTransactionType } from "~/FormMeta/TransactionFinancial/SearchTransactionType"

export const TransactionSearchMeta: IField[] = [
  {
    label: "Lookup",
    fieldName: "",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchLookupSelector,
    extraProps: {
      selectorKeys: [
        {
          label: "Purchaser",
          fieldName: "PersonID",
          valueField: "PersonID",
          component: SearchPersonLookupButton
        },
        {
          label: "Student",
          fieldName: "StudentID",
          valueField: "StudentID",
          component: SearchStudentLookupButton
        }
      ]
    }
  },
  {
    label: "Transaction Date",
    inputType: DATE_PICKERS,
    displayKey: "From",
    fieldName: "FromDate",
    displayKey2: "To",
    fieldName2: "ToDate"
  },
  {
    label: "Transaction Type",
    fieldName: "TransactionTypeID ",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchTransactionType
  },
  {
    label: "Order ID",
    inputType: NUMBER,
    fieldName: "OrderID"
  },
  {
    label: "Account",
    fieldName: "AccountID",
    valueField: "AccountID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchAccountLookup
  },
  {
    label: "GL Name",
    inputType: TEXT,
    fieldName: "GLAccountName"
  },
  {
    label: "Credit IDs",
    inputType: NUMBER,
    fieldName: "CreditMemoIDs"
  },
  {
    label: "SectionID",
    fieldName: "SectionIDID",
    valueField: "SectionIDID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchSectionLookupButton
  },

  {
    label: "Deposit ID",
    inputType: NUMBER,
    fieldName: "DepositID"
  },
  {
    label: "Payment ID",
    inputType: NUMBER,
    fieldName: "PaymentID"
  },

  {
    label: "Deposits with Balance",
    inputType: DROPDOWN,
    options: [
      { label: "Yes", value: "true" },
      { label: "No", value: "false" }
    ],
    fieldName: "DepositWithBalanceOnly"
  }
]
