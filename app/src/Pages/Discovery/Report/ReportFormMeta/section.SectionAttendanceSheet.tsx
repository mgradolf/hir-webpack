import { DATE_PICKERS, IFilterField } from "~/Component/Common/SearchFilters/common"
import { SearchSectionLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchSectionLookup"

const meta: IFilterField[] = [
  {
    label: "Section",
    fieldName: "SectionID",
    customFilterComponent: SearchSectionLookupButton
  },
  {
    label: "Schedule Date",
    fieldName: "DateRangeStart",
    fieldName2: "DateRangeEnd",
    inputType: DATE_PICKERS
  }
]

export default meta
