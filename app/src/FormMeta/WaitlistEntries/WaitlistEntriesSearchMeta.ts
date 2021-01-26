import { DATE_PICKERS, DROPDOWN, IFilterField } from "~/Component/Common/SearchFilters/common"
import { SearchOfferingLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchOfferingLookup"
import { SearchSectionLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchSectionLookup"
import WaitlistSearchCustomLookupFilter from "~/FormMeta/WaitlistEntries/WaitlistSearchCustomLookupFilter"

export const WaitlistEntriesSearchMeta: IFilterField[] = [
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
    label: "Creation Date",
    inputType: DATE_PICKERS,
    displayKey: "From",
    fieldName: "CreationTimeFrom",
    valueKey: "CreationTimeFrom",
    displayKey2: "To",
    valueKey2: "CreationTimeTo",
    fieldName2: "CreationTimeTo"
  },
  {
    label: "Expiration Date",
    inputType: DATE_PICKERS,
    displayKey: "From",
    fieldName: "RequestExpirationTimeFromExclusive",
    valueKey: "RequestExpirationTimeFromExclusive",
    displayKey2: "To",
    fieldName2: "RequestExpirationTimeToExclusive",
    valueKey2: "RequestExpirationTimeToExclusive"
  },
  {
    label: "Active",
    inputType: DROPDOWN,
    fieldName: "IsActive",
    options: [
      { label: "Yes", value: "true" },
      { label: "No", value: "false" }
    ]
  },
  {
    label: "Account/Person",
    fieldName: "SiteID",
    customFilterComponent: WaitlistSearchCustomLookupFilter
  }
]
