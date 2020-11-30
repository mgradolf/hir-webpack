import { getOPCStatusCode, getSourceModule } from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, IFilterField, NUMBER, TEXT } from "~/Component/Common/SearchFilters/common"
import { SearchLookupSelector } from "~/Component/Common/SearchFilters/SearchSelectors/SearchComponentSelector"
import { SearchDateTypeSelector } from "~/Component/Common/SearchFilters/SearchSelectors/SearchDateTypelector"
import TotalAmountRange from "~/Component/Section/Order/TotalAmountRange"
import { SearchAccountLookup } from "~/Component/Common/SearchFilters/SearchLookups/SearchAccountLookup"
import { SearchPersonLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchPersonLookup"
import { SearchStudentLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchStudentLookup"

export const OrderSearchMeta: IFilterField[] = [
  {
    label: "Total Amount",
    fieldName: "TotalAmountFrom",
    fieldName2: "TotalAmountTo",
    customFilterComponent: TotalAmountRange
  },
  {
    label: "Order ID",
    inputType: NUMBER,

    fieldName: "OrderID",
    ariaLabel: "OrderID"
  },
  {
    label: "Order Status",
    inputType: DROPDOWN,

    fieldName: "OrderStatusID",
    ariaLabel: "Order Status",
    refLookupService: getOPCStatusCode,
    displayKey: "Name",
    valueKey: "StatusID"
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
    label: "Product Name",
    inputType: TEXT,

    fieldName: "ProductName",
    ariaLabel: "ProductName"
  },
  {
    label: "Account",
    fieldName: "AccountID",
    valueField: "AccountID",
    customFilterComponent: SearchAccountLookup
  },
  {
    label: "Person Selector",
    fieldName: "",
    customFilterComponent: SearchLookupSelector,
    extraProps: {
      selectorKeys: [
        {
          label: "Buyer Name",
          fieldName: "BuyerName",
          valueField: "FormattedName",
          component: SearchPersonLookupButton
        },
        {
          label: "Student Name",
          fieldName: "StudentName",
          valueField: "FormattedName",
          component: SearchStudentLookupButton
        },
        {
          label: "Billed To Name",
          fieldName: "BilledPersonName",
          valueField: "FormattedName",
          component: SearchPersonLookupButton
        }
      ]
    }
  },
  {
    label: "Date Type Select",
    fieldName: "",
    customFilterComponent: SearchDateTypeSelector,
    extraProps: {
      selectorKeys: [
        {
          name: "Order Date",
          key1: "CreateDateFrom",
          key2: "CreateDateTo"
        },
        {
          name: "Due Date",
          key1: "PaymentDueDateFrom",
          key2: "PaymentDueDateTo"
        }
      ]
    }
  }
]
