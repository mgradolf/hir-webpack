import { DATE_PICKERS, IFilterField } from "~/Component/Common/SearchFilters/common"
import { SearchOfferingLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchOfferingLookup"
import { SearchSectionLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchSectionLookup"

const meta: IFilterField[] = [
  {
    label: "Section",
    fieldName: "SectionID",
    customFilterComponent: SearchSectionLookupButton
  },
  {
    label: "Offering",
    fieldName: "OfferingID",
    customFilterComponent: SearchOfferingLookupButton
  },
  {
    label: "Registration Date",
    fieldName: "FromRegistrationDate",
    fieldName2: "ToRegistrationDate",
    inputType: DATE_PICKERS
  }
]

export default meta

// SectionID
// OfferingID
// SectionUsageType
// FromRegistrationDate
// ToRegistrationDate
