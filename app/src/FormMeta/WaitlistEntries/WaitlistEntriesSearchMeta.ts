import { CUSTOM_FIELD, DATE_PICKERS, DROPDOWN, IField } from "~/Component/Common/Form/common"
import { SearchOfferingLookupButton } from "~/Component/Common/Form/SearchLookups/SearchOfferingLookup"
import { SearchSectionLookupButton } from "~/Component/Common/Form/SearchLookups/SearchSectionLookup"
import WaitlistSearchCustomLookupFilter from "~/FormMeta/WaitlistEntries/WaitlistSearchCustomLookupFilter"

export const WaitlistEntriesSearchMeta: IField[] = [
  {
    label: "Section",
    fieldName: "SectionID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchSectionLookupButton
  },
  {
    label: "Offering",
    fieldName: "OfferingID",
    inputType: CUSTOM_FIELD,
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
    inputType: CUSTOM_FIELD,
    customFilterComponent: WaitlistSearchCustomLookupFilter
  }
]
