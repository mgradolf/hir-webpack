import { getOPCStatusCode, getOrganizations, getSourceModule } from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, IFilterField, NUMBER, TEXT } from "~/Component/Common/SearchFilters/common"
import { SearchDateTypeSelector } from "~/Component/Common/SearchFilters/SearchSelectors/SearchDateTypelector"
import { SearchAccountLookup } from "~/Component/Common/SearchFilters/SearchLookups/SearchAccountLookup"
import { SearchSectionLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchSectionLookup"
import { SearchLookupSelector } from "~/Component/Common/SearchFilters/SearchSelectors/SearchComponentSelector"
import { SearchStudentLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchStudentLookup"

export const OrderItemsFiltersMeta: IFilterField[] = [
  {
    label: "Section Lookup",
    fieldName: "SectionID",
    customFilterComponent: SearchSectionLookupButton
  },
  {
    label: "Order Id",
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
    label: "Department",
    inputType: DROPDOWN,

    fieldName: "OrganizationID",
    ariaLabel: "Department Select",
    refLookupService: getOrganizations,
    displayKey: "Name",
    valueKey: "OrganizationID"
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
    fieldName: "AccountName",
    valueField: "AccountName",
    customFilterComponent: SearchAccountLookup
  },
  {
    label: "Person Lookup",
    fieldName: "",
    customFilterComponent: SearchLookupSelector,
    extraProps: {
      selectorKeys: [
        {
          label: "Purchaser",
          fieldName: "PayerName",
          valueField: "FirstName",
          component: SearchSectionLookupButton
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
