import { DATE_PICKERS, IFilterField } from "~/Component/Common/SearchFilters/common"
import { SearchSectionLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchSectionLookup"

const meta: IFilterField[] = [
  {
    label: "Select Date",
    fieldName: "StartDate",
    fieldName2: "EndDate",
    inputType: DATE_PICKERS
  },
  {
    label: "Section",
    fieldName: "SectionID",
    customFilterComponent: SearchSectionLookupButton
  }
]
export const mapping: { [key: string]: any } = {
  StartDate: "DisplayStartDate",
  EndDate: "DisplayEndDate"
}

export default meta
