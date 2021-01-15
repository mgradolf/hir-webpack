import { getMembershipProgramTypes } from "~/ApiServices/Service/RefLookupService"
import { DATE_PICKERS, DROPDOWN, IFilterField } from "~/Component/Common/SearchFilters/common"

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
    fieldName: "ID",
    refLookupService: getMembershipProgramTypes,
    displayKey: "Name",
    valueKey: "ID"
  }
]
export const mapping: { [key: string]: any } = {
  StartDate: "DisplayStartDate",
  EndDate: "DisplayEndDate"
}

export default meta
