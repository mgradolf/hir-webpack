import { getOrganizations, getProgramStatusCodes } from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"

export const ProgramSearchMeta: IFilterField[] = [
  {
    label: "Program Code",
    inputType: TEXT,
    defaultValue: "*",
    fieldName: "programCode"
  },
  {
    label: "Program Name",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "name"
  },
  {
    label: "Program Offering Code",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "programOfferingCode"
  },
  {
    label: "Program Offering Name",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "programOfferingName"
  },
  {
    label: "Status",
    inputType: DROPDOWN,
    fieldName: "programStatusCodeID",
    refLookupService: getProgramStatusCodes,
    displayKey: "Name",
    valueKey: "StatusID"
  },
  {
    label: "Department",
    inputType: DROPDOWN,
    fieldName: "departmentID",
    refLookupService: getOrganizations,
    displayKey: "Description",
    valueKey: "OrganizationID"
  }
]
