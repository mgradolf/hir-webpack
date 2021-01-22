import { BOOLEAN, DATE_PICKERS, IFilterField, NUMBER, TEXT } from "~/Component/Common/SearchFilters/common"
import { SearchAccountLookup } from "~/Component/Common/SearchFilters/SearchLookups/SearchAccountLookup"
import { SearchPersonLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchPersonLookup"
import { SearchSectionLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchSectionLookup"
import { SearchStudentLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchStudentLookup"
import { SearchLookupSelector } from "~/Component/Common/SearchFilters/SearchSelectors/SearchComponentSelector"
import { SearchTransactionType } from "~/FormMeta/TransactionFinancial/SearchTransactionType"

export const TransactionSearchMeta: IFilterField[] = [
  {
    label: "Lookup",
    fieldName: "",
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
    inputType: BOOLEAN,
    fieldName: "DepositWithBalanceOnly"
  }
]
