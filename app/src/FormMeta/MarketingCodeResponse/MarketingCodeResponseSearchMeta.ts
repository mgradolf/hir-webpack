import { getMarketingCategory } from "~/ApiServices/Service/MarketingService"
import { CUSTOM_FIELD, DATE_PICKERS, DROPDOWN, IField } from "~/Component/Common/Form/common"
import { SearchAccountLookup } from "~/Component/Common/Form/SearchLookups/SearchAccountLookup"
import { SearchMarketingCodeLookup } from "~/Component/Common/Form/SearchLookups/SearchMarketingCodeLookup"
import { SearchOfferingLookupButton } from "~/Component/Common/Form/SearchLookups/SearchOfferingLookup"
import { SearchPersonLookupButton } from "~/Component/Common/Form/SearchLookups/SearchPersonLookup"
import { SearchProgramLookupButton } from "~/Component/Common/Form/SearchLookups/SearchProgramLookup"
import { SearchSectionLookupButton } from "~/Component/Common/Form/SearchLookups/SearchSectionLookup"
import { SearchLookupSelector } from "~/Component/Common/Form/SearchSelectors/SearchComponentSelector"

export const MarketingCodeResponseSearchMeta: IField[] = [
  {
    label: "Promotion Code",
    fieldName: "MarketingCodeID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchMarketingCodeLookup
  },
  {
    label: "Category",
    inputType: DROPDOWN,
    refLookupService: () => getMarketingCategory({}),
    fieldName: "CategoryID",
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Lookup",
    fieldName: "",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchLookupSelector,
    extraProps: {
      selectorKeys: [
        {
          label: "Section",
          fieldName: "SectionId",
          valueField: "SectionID",
          component: SearchSectionLookupButton
        },
        {
          label: "Offering",
          fieldName: "OfferingID",
          valueField: "OfferingID",
          component: SearchOfferingLookupButton
        },
        {
          label: "Program",
          fieldName: "ProgramID",
          valueField: "ProgramID",
          component: SearchProgramLookupButton
        }
      ]
    }
  },
  {
    label: "Order Date",
    inputType: DATE_PICKERS,
    displayKey: "From",
    fieldName: "StartDate",
    valueKey: "StartDate",
    displayKey2: "To",
    valueKey2: "EndDate",
    fieldName2: "EndDate"
  },
  {
    label: "Purchaser",
    fieldName: "PersonID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchPersonLookupButton
  },
  {
    label: "Account",
    fieldName: "AccountID",
    valueField: "AccountID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchAccountLookup
  }
]
