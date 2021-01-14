import { getMembershipProgramTypes } from "~/ApiServices/Service/RefLookupService"
import { DATE_PICKERS, DROPDOWN, IFilterField } from "~/Component/Common/SearchFilters/common"
import { SearchSectionLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchSectionLookup"

const meta: IFilterField[] = [
  {
    label: "Select Date",
    fieldName: "StartDate",
    fieldName2: "EndDate",
    inputType: DATE_PICKERS
  },
  {
    label: "Membership Program",
    inputType: DROPDOWN,
    fieldName: "MembershipProgramID",
    refLookupService: getMembershipProgramTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Section",
    fieldName: "SectionIDs",
    customFilterComponent: SearchSectionLookupButton,
    extraProps: {
      isArray: true
    }
  }
]
export const mapping: { [key: string]: any } = {
  StartDate: "DisplayStartDate",
  EndDate: "DisplayEndDate"
}

export default meta
