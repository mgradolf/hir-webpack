import { getOrganizationByType } from "~/ApiServices/BizApi/org/orgIf"
import { getProgramEnrollmentStatusCodes } from "~/ApiServices/Service/RefLookupService"
import { CUSTOM_FIELD, DROPDOWN, IField, TEXT } from "~/Component/Common/Form/common"
import { SearchStudentLookupButton } from "~/Component/Common/Form/SearchLookups/SearchStudentLookup"

export const ProgramEnrollmentSearchMeta: IField[] = [
  {
    label: "Program Name",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "programName"
  },
  {
    label: "Student",
    fieldName: "StudentID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchStudentLookupButton
  },
  {
    label: "Status",
    inputType: DROPDOWN,
    fieldName: "applicationStatus",
    refLookupService: getProgramEnrollmentStatusCodes,
    displayKey: "Name",
    valueKey: "StatusID"
  },
  {
    label: "Department",
    inputType: DROPDOWN,
    fieldName: "departmentID",
    refLookupService: getOrganizationByType,
    displayKey: "Description",
    valueKey: "OrganizationID"
  },
  {
    label: "Program Code",
    inputType: TEXT,
    defaultValue: "*",
    fieldName: "programCode"
  }
]
