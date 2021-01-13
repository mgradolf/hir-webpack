import { DATE_PICKERS, IFilterField } from "~/Component/Common/SearchFilters/common"
import { SearchSectionLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchSectionLookup"

const meta: IFilterField[] = [
  {
    label: "Section Number",
    fieldName: "SectionID",
    customFilterComponent: SearchSectionLookupButton
  },
  {
    label: "Meeting Date",
    fieldName: "FromMeetinglDate",
    fieldName2: "ToMeetingDate",
    inputType: DATE_PICKERS
  }
]

export default meta
