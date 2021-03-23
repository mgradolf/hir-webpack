import { getOPCStatusCode, getSourceModule } from "~/ApiServices/Service/RefLookupService"
import { CUSTOM_FIELD, DROPDOWN, IField, NUMBER, TEXT } from "~/Component/Common/Form/common"
import { FormFieldSelector } from "~/Component/Common/Form/FormFieldSelectors/FormFieldSelector"
import { FormDateTypelector } from "~/Component/Common/Form/FormFieldSelectors/FormDateTypelector"
import TotalAmountRange from "~/Component/Feature/Section/Order/TotalAmountRange"
import { AccountLookup } from "~/Component/Common/Form/FormLookupFields/AccountLookup"
import { PersonLookup } from "~/Component/Common/Form/FormLookupFields/PersonLookup"
import { StudentLookup } from "~/Component/Common/Form/FormLookupFields/StudentLookup"
import { SectionLookup } from "~/Component/Common/Form/FormLookupFields/SectionLookup"

export const OrderSearchMeta: IField[] = [
  {
    label: "Person Selector",
    fieldName: "",
    inputType: CUSTOM_FIELD,
    customFilterComponent: FormFieldSelector,
    extraProps: {
      selectorKeys: [
        {
          label: "Purchaser",
          fieldName: "BuyerName",
          valueField: "FormattedName",
          component: PersonLookup
        },
        {
          label: "Student",
          fieldName: "StudentName",
          valueField: "FormattedName",
          component: StudentLookup
        },
        {
          label: "Billed To Name",
          fieldName: "BilledPersonName",
          valueField: "FormattedName",
          component: PersonLookup
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
    customFilterComponent: FormDateTypelector,
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
    customFilterComponent: SectionLookup
  },
  {
    label: "Account",
    fieldName: "AccountID",
    valueField: "AccountID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: AccountLookup
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
