import { getOPCStatusCode, getOrganizations, getSourceModule } from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, IFilterField, NUMBER, TEXT } from "~/Component/Common/SearchFilters/common"
import { SearchDateTypeSelector } from "~/Component/Common/SearchFilters/SearchSelectors/SearchDateTypelector"
import { SearchAccountLookup } from "~/Component/Common/SearchFilters/SearchLookups/SearchAccountLookup"
import { SectionLookupOpenButton } from "~/Component/LookupModals/SectionLookupModal"
import { SearchPersonSelector } from "~/Component/Common/SearchFilters/SearchSelectors/SearchPersonSelector"

export const OrderItemsFiltersMeta: IFilterField[] = [
  {
    label: "Section Lookup",
    fieldName: "SectionID",
    customFilterComponent: SectionLookupOpenButton
  },
  {
    label: "Order Id",
    inputType: NUMBER,
    defaultValue: "",
    fieldName: "OrderID",
    ariaLabel: "OrderID"
  },
  {
    label: "Order Status",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "OrderStatusID",
    ariaLabel: "Order Status",
    refLookupService: getOPCStatusCode,
    displayKey: "Name",
    valueKey: "StatusID"
  },
  {
    label: "Department",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "OrganizationID",
    ariaLabel: "Department Select",
    refLookupService: getOrganizations,
    displayKey: "Name",
    valueKey: "OrganizationID"
  },
  {
    label: "Source",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "SourceID",
    ariaLabel: "Source",
    refLookupService: getSourceModule,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Product Name",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "ProductName",
    ariaLabel: "ProductName"
  },
  {
    label: "Account Lookup",
    fieldName: "AccountID",
    customFilterComponent: SearchAccountLookup
  },
  {
    label: "Person Lookup",
    fieldName: "",
    customFilterComponent: SearchPersonSelector,
    extraProps: {
      selectorKeys: [
        {
          name: "Purchaser",
          key: "PayerName"
        },
        {
          name: "Student",
          key: "StudentName"
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
