import { getMarketingCategory } from "~/ApiServices/Service/MarketingService"
import { DATE_PICKERS, DROPDOWN, IFilterField } from "~/Component/Common/SearchFilters/common"
import { SearchAccountLookup } from "~/Component/Common/SearchFilters/SearchLookups/SearchAccountLookup"
import { SearchMarketingCodeLookup } from "~/Component/Common/SearchFilters/SearchLookups/SearchMarketingCodeLookup"
import { SearchOfferingLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchOfferingLookup"
import { SearchPersonLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchPersonLookup"
import { SearchProgramLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchProgramLookup"
import { SearchSectionLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchSectionLookup"
import { SearchLookupSelector } from "~/Component/Common/SearchFilters/SearchSelectors/SearchComponentSelector"

export const MarketingCodeResponseSearchMeta: IFilterField[] = [
  {
    label: "Marketing Code",
    inputType: DROPDOWN,
    fieldName: "MarketingCodeID",
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
    fullWidth: true,
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
    customFilterComponent: SearchPersonLookupButton
  },
  {
    label: "Account",
    fieldName: "AccountID",
    valueField: "AccountID",
    customFilterComponent: SearchAccountLookup
  }
]
