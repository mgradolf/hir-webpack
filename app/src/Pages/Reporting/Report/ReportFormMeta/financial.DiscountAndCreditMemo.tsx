import { CUSTOM_FIELD, IField } from "~/Component/Common/SearchForm/common"
import { SearchOfferingLookupButton } from "~/Component/Common/SearchForm/SearchLookups/SearchOfferingLookup"
import { SearchSectionLookupButton } from "~/Component/Common/SearchForm/SearchLookups/SearchSectionLookup"
import { SearchStudentLookupButton } from "~/Component/Common/SearchForm/SearchLookups/SearchStudentLookup"
import { SearchLookupSelector } from "~/Component/Common/SearchForm/SearchSelectors/SearchComponentSelector"
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
    label: "Student",
    fieldName: "StudentID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchStudentLookupButton
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
