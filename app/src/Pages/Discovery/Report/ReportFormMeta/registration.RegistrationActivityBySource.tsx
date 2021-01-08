import { getOrganizations, getSourceModule } from "~/ApiServices/Service/RefLookupService"
import { DATE_PICKERS, DROPDOWN, IFilterField } from "~/Component/Common/SearchFilters/common"

const meta: IFilterField[] = [
  {
    label: "Registration Date",
    fieldName: "date_start",
    fieldName2: "date_end",
    inputType: DATE_PICKERS
  },
  {
    label: "Department",
    inputType: DROPDOWN,
    fieldName: "OrganizationID",
    refLookupService: getOrganizations,
    displayKey: "Name",
    valueKey: "OrganizationID"
  },
  {
    label: "Registration Source",
    inputType: DROPDOWN,
    fieldName: "sourceAll",
    refLookupService: getSourceModule,
    displayKey: "Name",
    valueKey: "ID"
  }
]

export default meta

// sourceAll
// date_start
// date_end
// OrganizationID
