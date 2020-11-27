import { getOrganizations, getProgramStatusCodes } from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, IFilterFieldObject, TEXT } from "~/Component/Common/SearchFilters/common"

const programMeta: IFilterFieldObject[] = [
  {
    label: "Program Code",
    inputType: TEXT,
    defaultValue: "*",
    fieldName: "programCode",
    ariaLabel: "Program Code"
  },
  {
    label: "Program Name",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "name",
    ariaLabel: "Program Name"
  },
  {
    label: "Program Offering Code",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "programOfferingCode",
    ariaLabel: "Program Offering Code"
  },
  {
    label: "Program Offering Name",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "programOfferingName",
    ariaLabel: "Program Offering Name"
  },
  {
    label: "Status",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "programStatusCodeID",
    ariaLabel: "Program Status Select",
    refLookupService: getProgramStatusCodes,
    displayKey: "Name",
    valueKey: "StatusID"
  },
  {
    label: "Department",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "departmentID",
    ariaLabel: "Department Select",
    refLookupService: getOrganizations,
    displayKey: "Description",
    valueKey: "OrganizationID"
  }
]

export default programMeta
