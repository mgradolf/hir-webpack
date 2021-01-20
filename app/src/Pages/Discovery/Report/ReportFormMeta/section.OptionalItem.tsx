// import { searchResourceItem } from "~/ApiServices/Service/FinancialService"
import { DATE_PICKERS, IFilterField } from "~/Component/Common/SearchFilters/common"
import { SearchOfferingLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchOfferingLookup"
import { SearchPersonLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchPersonLookup"
import { SearchProducttLookup } from "~/Component/Common/SearchFilters/SearchLookups/SearchProductLookup"
import { SearchSectionLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchSectionLookup"
import { SearchLookupSelector } from "~/Component/Common/SearchFilters/SearchSelectors/SearchComponentSelector"
import { IReportMeta } from "~/Pages/Discovery/Report/IReportMeta"

const meta: IFilterField[] = [
  {
    label: "Person Selector",
    fieldName: "",
    customFilterComponent: SearchLookupSelector,
    extraProps: {
      selectorKeys: [
        {
          label: "Section",
          fieldName: "SectionID",
          valueField: "SectionID",
          component: SearchSectionLookupButton
        },
        {
          label: "Offering",
          fieldName: "OfferingID",
          valueField: "OfferingID",
          component: SearchOfferingLookupButton
        }
      ]
    }
  },
  {
    label: "Person",
    fieldName: "PersonID",
    customFilterComponent: SearchPersonLookupButton
  },
  {
    label: "Section Date",
    fieldName: "StartDateFrom",
    fieldName2: "StartDateTo",
    inputType: DATE_PICKERS
  },
  {
    label: "Purchaser",
    fieldName: "ProductID",
    customFilterComponent: SearchProducttLookup
  }
  // {
  //   label: "Resources",
  //   fieldName: "ResourceID",
  //   customFilterComponent: searchResourceItem
  // }
]

const reportMeta: IReportMeta = {
  meta
}

export default reportMeta
