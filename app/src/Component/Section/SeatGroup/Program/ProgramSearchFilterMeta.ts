import { getOrganizations, getProgramStatusCodes } from "~/ApiServices/Service/RefLookupService"

const TEXT = "TEXT" // TODO: Temp. change, to delete later
const DROPDOWN = "DROPDOWN" // TODO: Temp. change, to delete later

const programMeta = [
  {
    label: "Program Code",
    inputType: TEXT,
    defaultValue: "",
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
    fieldName: "OrganizationTypeID",
    ariaLabel: "Department Select",
    refLookupService: getOrganizations,
    displayKey: "Name",
    valueKey: "OrganizationTypeID"
  }
]

export default programMeta
