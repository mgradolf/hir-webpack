import { DATE_PICKERS, CUSTOM_FIELD, IField } from "~/Component/Common/Form/common"

import { SearchOfferingLookupButton } from "~/Component/Common/Form/SearchLookups/SearchOfferingLookup"
import { SearchPersonLookupButton } from "~/Component/Common/Form/SearchLookups/SearchPersonLookup"
import { SearchProducttLookup } from "~/Component/Common/Form/SearchLookups/SearchProductLookup"
import { SearchSectionLookupButton } from "~/Component/Common/Form/SearchLookups/SearchSectionLookup"
import { SearchLookupSelector } from "~/Component/Common/Form/SearchSelectors/SearchComponentSelector"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Person Selector",
    fieldName: "",
    inputType: CUSTOM_FIELD,
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
    inputType: CUSTOM_FIELD,
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
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchProducttLookup
  }
]

const reportMeta: IReportMeta = {
  meta
}

export default reportMeta
