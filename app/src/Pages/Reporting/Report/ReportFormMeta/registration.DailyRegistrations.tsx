import { DATE_PICKERS, DROPDOWN, CUSTOM_FIELD, IField } from "~/Component/Common/Form/common"

import { SearchOfferingLookupButton } from "~/Component/Common/Form/SearchLookups/SearchOfferingLookup"
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
    label: "Registration Date",
    fieldName: "FromRegistrationDate",
    fieldName2: "ToRegistrationDate",
    inputType: DATE_PICKERS
  },
  {
    label: "Show Program Sections",
    inputType: DROPDOWN,
    fieldName: "SectionUsageType",
    options: [
      { label: "Yes", value: "true" },
      { label: "No", value: "false" }
    ]
  }
]

const reportMeta: IReportMeta = {
  meta
}

export default reportMeta
