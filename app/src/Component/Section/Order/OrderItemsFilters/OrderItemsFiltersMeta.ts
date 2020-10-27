import { getOPCStatusCode, getOrganizations, getSourceModule } from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, IFilterField, NUMBER, TEXT } from "~/Component/Common/SearchFilters/common"
import PersonSelector from "~/Component/Section/Order/OrderItemsFilters/PersonSelector"
import DateTypelector from "~/Component/Section/Order/OrderItemsFilters/DateTypelector"
import AccountLookup from "~/Component/Section/Order/OrderItemsFilters/AccountLookup"
import { SectionLookupOpenButton } from "~/Component/LookupModals/SectionLookupModal"

export const OrderItemsFiltersMeta: IFilterField[] = [
  {
    inputType: "SECTION_SELECTOR",
    fieldName: "",
    customFilterComponent: SectionLookupOpenButton
  },
  {
    inputType: "PERSON_SELECTOR",
    fieldName: "",
    customFilterComponent: PersonSelector
  },
  {
    inputType: "DATE_TYPE_SELECTOR",
    fieldName: "",
    customFilterComponent: DateTypelector
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
    inputType: "ACCOUNT_LOOKUP",
    fieldName: "",
    customFilterComponent: AccountLookup
  }
]
