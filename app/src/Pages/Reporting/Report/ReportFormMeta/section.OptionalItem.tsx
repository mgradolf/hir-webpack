import { DATE_PICKERS, CUSTOM_FIELD, IField } from "~/Component/Common/SearchFilters/SearchForm/common"

import { SearchOfferingLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchOfferingLookup"
import { SearchPersonLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchPersonLookup"
import { SearchProducttLookup } from "~/Component/Common/SearchFilters/SearchLookups/SearchProductLookup"
import { SearchSectionLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchSectionLookup"
import { SearchLookupSelector } from "~/Component/Common/SearchFilters/SearchSelectors/SearchComponentSelector"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Person Selector",
    fieldName: "",
    customFilterComponent: SearchLookupSelector,
    inputType: CUSTOM_FIELD,
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
    customFilterComponent: SearchPersonLookupButton,
    inputType: CUSTOM_FIELD
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
    customFilterComponent: SearchProducttLookup,
    inputType: CUSTOM_FIELD
  }
]

const reportMeta: IReportMeta = {
  meta
}

export default reportMeta
