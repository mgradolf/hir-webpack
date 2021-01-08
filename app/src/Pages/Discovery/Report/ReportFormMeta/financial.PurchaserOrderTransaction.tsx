import { getOrganizations } from "~/ApiServices/Service/RefLookupService"
import { DATE_PICKERS, DROPDOWN, IFilterField, NUMBER } from "~/Component/Common/SearchFilters/common"
import { SearchPersonLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchPersonLookup"

const meta: IFilterField[] = [
  {
    label: "Order Date",
    inputType: DATE_PICKERS,
    fieldName: "OrderDateFrom",
    fieldName2: "OrderDateTo"
  },
  {
    label: "Purchaser",
    fieldName: "PersonID",
    customFilterComponent: SearchPersonLookupButton
  },
  {
    label: "OrderID",
    inputType: NUMBER,
    fieldName: "OrderID"
  },
  {
    label: "Department",
    inputType: DROPDOWN,
    fieldName: "OrganizationID",
    refLookupService: getOrganizations,
    displayKey: "Name",
    valueKey: "OrganizationID"
  }
]

export default meta
