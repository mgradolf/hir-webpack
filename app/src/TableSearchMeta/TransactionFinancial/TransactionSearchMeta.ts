import { CUSTOM_FIELD, DATE_PICKERS, DROPDOWN, IField, NUMBER, TEXT } from "~/Component/Common/Form/common"
import { AccountLookup } from "~/Component/Common/Form/FormLookupFields/AccountLookup"
import { PersonLookup } from "~/Component/Common/Form/FormLookupFields/PersonLookup"
import { SectionLookup } from "~/Component/Common/Form/FormLookupFields/SectionLookup"
import { StudentLookup } from "~/Component/Common/Form/FormLookupFields/StudentLookup"
import { FormFieldSelector } from "~/Component/Common/Form/FormFieldSelectors/FormFieldSelector"
import { SearchTransactionType } from "~/TableSearchMeta/TransactionFinancial/SearchTransactionType"

export const TransactionSearchMeta: IField[] = [
  {
    label: "Lookup",
    fieldName: "",
    inputType: CUSTOM_FIELD,
    customFilterComponent: FormFieldSelector,
    extraProps: {
      selectorKeys: [
        {
          label: "Purchaser",
          fieldName: "PersonID",
          valueKey: "PersonID",
          component: PersonLookup
        },
        {
          label: "Student",
          fieldName: "StudentID",
          valueKey: "StudentID",
          component: StudentLookup
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
    valueKey: "AccountID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: AccountLookup
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
    valueKey: "SectionIDID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SectionLookup
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
