import { getOPCStatusCode, getOrganizations, getSourceModule } from "~/ApiServices/Service/RefLookupService"
import { CUSTOM_FIELD, DROPDOWN, IField, NUMBER, TEXT } from "~/Component/Common/SearchForm/common"
import { SearchDateTypeSelector } from "~/Component/Common/SearchForm/SearchSelectors/SearchDateTypelector"
import { SearchAccountLookup } from "~/Component/Common/SearchForm/SearchLookups/SearchAccountLookup"
import { SearchSectionLookupButton } from "~/Component/Common/SearchForm/SearchLookups/SearchSectionLookup"
import { SearchLookupSelector } from "~/Component/Common/SearchForm/SearchSelectors/SearchComponentSelector"
import { SearchStudentLookupButton } from "~/Component/Common/SearchForm/SearchLookups/SearchStudentLookup"
import { SearchPersonLookupButton } from "~/Component/Common/SearchForm/SearchLookups/SearchPersonLookup"

export const OrderItemsFiltersMeta: IField[] = [
  {
    label: "Person Lookup",
    fieldName: "",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchLookupSelector,
    extraProps: {
      selectorKeys: [
        {
          label: "Purchaser",
          fieldName: "PayerName",
          valueField: "FirstName",
          component: SearchPersonLookupButton
        },
        {
          label: "Student",
          fieldName: "StudentName",
          valueField: "FirstName",
          component: SearchStudentLookupButton
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
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchSectionLookupButton
  },
  {
    label: "Account",
    fieldName: "AccountName",
    valueField: "AccountName",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchAccountLookup
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
