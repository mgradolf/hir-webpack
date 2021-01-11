import { getOrganizationByType } from "~/ApiServices/BizApi/org/orgIf"
import { getProgramApplicationStatusCodes } from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"
import { SearchStudentLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchStudentLookup"

export const ProgramApplicationSearchMeta: IFilterField[] = [
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
    fieldName: "programName",
    ariaLabel: "Program Name"
  },
  {
    label: "Status",
    inputType: DROPDOWN,
    fieldName: "applicationStatus",
    ariaLabel: "Program Status Select",
    refLookupService: getProgramApplicationStatusCodes,
    displayKey: "Name",
    valueKey: "StatusID"
  },
  {
    label: "Department",
    inputType: DROPDOWN,
    fieldName: "departmentID",
    ariaLabel: "Department Select",
    refLookupService: getOrganizationByType,
    displayKey: "Description",
    valueKey: "OrganizationID"
  },
  {
    label: "Student Name",
    fieldName: "studentID",
    customFilterComponent: SearchStudentLookupButton
  }
]
