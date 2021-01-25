import { CUSTOM_FIELD, IField } from "~/Component/Common/SearchFilters/SearchForm/common"
import { SearchOfferingLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchOfferingLookup"
import { SearchSectionLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchSectionLookup"
import { SearchStudentLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchStudentLookup"
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
    label: "Student",
    fieldName: "StudentID",
    customFilterComponent: SearchStudentLookupButton,
    inputType: CUSTOM_FIELD
  }
]

const reportMeta: IReportMeta = {
  meta,
  defaultFilter: {
    CreditAmount: 0,
    DiscountAmount: 0
  }
}

export default reportMeta
