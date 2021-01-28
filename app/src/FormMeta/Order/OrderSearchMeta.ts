import { getOPCStatusCode, getSourceModule } from "~/ApiServices/Service/RefLookupService"
import { CUSTOM_FIELD, DROPDOWN, IField, NUMBER, TEXT } from "~/Component/Common/Form/common"
import { SearchLookupSelector } from "~/Component/Common/Form/SearchSelectors/SearchComponentSelector"
import { SearchDateTypeSelector } from "~/Component/Common/Form/SearchSelectors/SearchDateTypelector"
import TotalAmountRange from "~/Component/Section/Order/TotalAmountRange"
import { SearchAccountLookup } from "~/Component/Common/Form/SearchLookups/SearchAccountLookup"
import { SearchPersonLookupButton } from "~/Component/Common/Form/SearchLookups/SearchPersonLookup"
import { SearchStudentLookupButton } from "~/Component/Common/Form/SearchLookups/SearchStudentLookup"
import { SearchSectionLookupButton } from "~/Component/Common/Form/SearchLookups/SearchSectionLookup"

export const OrderSearchMeta: IField[] = [
  {
    label: "Person Selector",
    fieldName: "",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchLookupSelector,
    extraProps: {
      selectorKeys: [
        {
          label: "Purchaser",
          fieldName: "BuyerName",
          valueField: "FormattedName",
          component: SearchPersonLookupButton
        },
        {
          label: "Student",
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
    label: "Order ID",
    inputType: NUMBER,
    fieldName: "OrderID"
  },
  {
    label: "Date Type Select",
    fieldName: "",
    inputType: CUSTOM_FIELD,
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
  },
  {
    label: "Section",
    fieldName: "SectionID",
    valueField: "SectionID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchSectionLookupButton
  },
  {
    label: "Account",
    fieldName: "AccountID",
    valueField: "AccountID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchAccountLookup
  },
  {
    label: "Total Amount",
    fieldName: "TotalAmountFrom",
    fieldName2: "TotalAmountTo",
    inputType: CUSTOM_FIELD,
    customFilterComponent: TotalAmountRange
  },
  {
    label: "Product Name",
    inputType: TEXT,
    fieldName: "ProductName"
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
    label: "Order Status",
    inputType: DROPDOWN,
    fieldName: "OrderStatusID",
    refLookupService: getOPCStatusCode,
    displayKey: "Name",
    valueKey: "StatusID"
  }
]
