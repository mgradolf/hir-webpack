import { getOPCStatusCode, getSourceModule } from "~/ApiServices/Service/RefLookupService"
import { CUSTOM_FIELD, DATE_PICKERS, DROPDOWN, IField, NUMBER, TEXT } from "~/Component/Common/Form/common"
// import { FormFieldSelector } from "~/Component/Common/Form/FormFieldSelectors/FormFieldSelector"
// import { FormDateTypelector } from "~/Component/Common/Form/FormFieldSelectors/FormDateTypelector"
import TotalAmountRange from "~/Component/Feature/Section/Order/TotalAmountRange"
import { AccountLookup } from "~/Component/Common/Form/FormLookupFields/AccountLookup"
import { PersonLookup } from "~/Component/Common/Form/FormLookupFields/PersonLookup"
import { StudentLookup } from "~/Component/Common/Form/FormLookupFields/StudentLookup"
import { SectionLookup } from "~/Component/Common/Form/FormLookupFields/SectionLookup"

export const OrderSearchMeta: IField[] = [
  {
    label: "Purchaser",
    fieldName: "BuyerName",
    valueKey: "FormattedName",
    inputType: CUSTOM_FIELD,
    customFilterComponent: PersonLookup
  },
  {
    label: "Student",
    fieldName: "StudentName",
    valueKey: "FormattedName",
    inputType: CUSTOM_FIELD,
    customFilterComponent: StudentLookup
  },
  {
    label: "Billed To Name",
    fieldName: "BilledPersonName",
    valueKey: "FormattedName",
    inputType: CUSTOM_FIELD,
    customFilterComponent: PersonLookup
  },
  {
    label: "Order ID",
    inputType: NUMBER,
    fieldName: "OrderID"
  },
  {
    label: "Order Date",
    fieldName: "CreateDateFrom",
    fieldName2: "CreateDateTo",
    inputType: DATE_PICKERS
  },
  {
    label: "Due Date",
    fieldName: "PaymentDueDateFrom",
    fieldName2: "PaymentDueDateTo",
    inputType: DATE_PICKERS
  },
  {
    label: "Section",
    fieldName: "SectionID",
    valueKey: "SectionID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SectionLookup
  },
  {
    label: "Account",
    fieldName: "AccountID",
    valueKey: "AccountID",
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
