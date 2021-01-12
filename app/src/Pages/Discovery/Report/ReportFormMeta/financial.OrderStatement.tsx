import { getOrganizations, getSourceModule } from "~/ApiServices/Service/RefLookupService"
import { DATE_PICKERS, DROPDOWN, IFilterField, NUMBER } from "~/Component/Common/SearchFilters/common"
import { SearchAccountLookup } from "~/Component/Common/SearchFilters/SearchLookups/SearchAccountLookup"
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
    label: "Source",
    inputType: DROPDOWN,
    fieldName: "SourceID",
    refLookupService: getSourceModule,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Account",
    fieldName: "AffiliateOrganizationID",
    customFilterComponent: SearchAccountLookup
  },
  {
    label: "Department",
    inputType: DROPDOWN,
    fieldName: "OrganizationID",
    refLookupService: getOrganizations,
    displayKey: "Name",
    valueKey: "OrganizationID"
  },
  {
    label: "OrderID",
    inputType: NUMBER,
    fieldName: "OrderID"
  }
]

export default meta

// OrderDateFrom
// OrderDateFrom_DisplayOnly
// OrderDateTo
// OrderDateTo_DisplayOnly
// AffiliateOrganizationID
// OrganizationID
// PersonID
// OrderID
