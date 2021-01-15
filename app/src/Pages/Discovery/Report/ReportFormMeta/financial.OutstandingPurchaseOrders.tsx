import { BOOLEAN, IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"

const meta: IFilterField[] = [
  {
    label: "Organization Name",
    inputType: TEXT,
    fieldName: "OrganizationName"
  },
  {
    label: "Show Only Overdue Purchase Orders",
    fieldName: "onlyOutstanding",
    inputType: BOOLEAN
  }
]

export const mapping: { [key: string]: any } = {
  OrganizationName: "OrganizationName1"
}

export default meta
