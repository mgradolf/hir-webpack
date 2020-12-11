import { getProgramEnrollmentStatusCodes } from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"
import { getOrganizationByType } from "~/ApiServices/BizApi/organization/orgIF"
import { SearchStudentLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchStudentLookup"

export const ProgramEnrollmentSearchMeta: IFilterField[] = [
  {
    label: "Program Name",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "programName",
    ariaLabel: "Program Name"
  },
  {
    label: "Student",
    fieldName: "StudentID",
    customFilterComponent: SearchStudentLookupButton
  },
  {
    label: "Status",
    inputType: DROPDOWN,
    fieldName: "applicationStatus",
    ariaLabel: "Program Status Select",
    refLookupService: getProgramEnrollmentStatusCodes,
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
    label: "Program Code",
    inputType: TEXT,
    defaultValue: "*",
    fieldName: "programCode",
    ariaLabel: "Program Code"
  }
]
