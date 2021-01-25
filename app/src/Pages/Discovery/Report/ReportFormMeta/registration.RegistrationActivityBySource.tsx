import { getOrganizations, getSourceModule } from "~/ApiServices/Service/RefLookupService"
import { DATE_PICKERS, DROPDOWN, IField } from "~/Component/Common/SearchFilters/SearchForm/common"
import { IReportMeta } from "~/Pages/Discovery/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Registration Date",
    fieldName: "date_start",
    fieldName2: "date_end",
    rules: [{ required: true, message: "Date field is Required" }],

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
    rules: [{ required: true, message: "Source field is Required" }],

    inputType: DROPDOWN,
    fieldName: "sourceAll",
    refLookupService: getSourceModule,
    displayKey: "Name",
    valueKey: "ID"
  }
]

const reportMeta: IReportMeta = {
  meta
}

export default reportMeta
