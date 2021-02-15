import { getOPCStatusCode, getOrganizations, getSourceModule } from "~/ApiServices/Service/RefLookupService"
import { CUSTOM_FIELD, DROPDOWN, IField, NUMBER, TEXT } from "~/Component/Common/Form/common"
import { FormDateTypelector } from "~/Component/Common/Form/FormFieldSelectors/FormDateTypelector"
import { AccountLookup } from "~/Component/Common/Form/FormLookupFields/AccountLookup"
import { SectionLookup } from "~/Component/Common/Form/FormLookupFields/SectionLookup"
import { FormFieldSelector } from "~/Component/Common/Form/FormFieldSelectors/FormFieldSelector"
import { StudentLookup } from "~/Component/Common/Form/FormLookupFields/StudentLookup"
import { PersonLookup } from "~/Component/Common/Form/FormLookupFields/PersonLookup"

export const OrderItemsFiltersMeta: IField[] = [
  {
    label: "Person Lookup",
    fieldName: "",
    inputType: CUSTOM_FIELD,
    customFilterComponent: FormFieldSelector,
    extraProps: {
      selectorKeys: [
        {
          label: "Purchaser",
          fieldName: "PayerName",
          valueField: "FirstName",
          component: PersonLookup
        },
        {
          label: "Student",
          fieldName: "StudentName",
          valueField: "FirstName",
          component: StudentLookup
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
    inputType: CUSTOM_FIELD,
    customFilterComponent: SectionLookup
  },
  {
    label: "Account",
    fieldName: "AccountName",
    valueField: "AccountName",
    inputType: CUSTOM_FIELD,
    customFilterComponent: AccountLookup
  },
  {
    label: "Department",
    inputType: DROPDOWN,
    fieldName: "DepartmentID",
    refLookupService: getOrganizations,
    displayKey: "Name",
    valueKey: "OrganizationID"
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
