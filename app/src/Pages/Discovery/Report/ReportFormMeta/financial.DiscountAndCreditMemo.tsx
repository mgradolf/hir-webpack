import { IFilterField, NUMBER } from "~/Component/Common/SearchFilters/common"
import { SearchOfferingLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchOfferingLookup"
import { SearchSectionLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchSectionLookup"
import { SearchStudentLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchStudentLookup"
import { SearchLookupSelector } from "~/Component/Common/SearchFilters/SearchSelectors/SearchComponentSelector"

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
          valueField: "FormattedName",
          component: SearchSectionLookupButton
        },
        {
          label: "Offering",
          fieldName: "OfferingID",
          valueField: "FormattedName",
          component: SearchOfferingLookupButton
        }
      ]
    }
  },
  {
    label: "Student",
    fieldName: "StudentID",
    customFilterComponent: SearchStudentLookupButton
  },
  {
    label: "Credit Amount",
    inputType: NUMBER,
    fieldName: "CreditAmount"
  },
  {
    label: "Discount Amount",
    inputType: NUMBER,
    fieldName: "DiscountAmount"
  }
]

export default meta

// SectionID
// OfferingID
// StudentID
// CreditAmount
// DiscountAmount
