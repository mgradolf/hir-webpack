import { getOrganizationByType } from "~/ApiServices/BizApi/org/orgIf"
import { getProgramApplicationStatusCodes } from "~/ApiServices/Service/RefLookupService"
import { CUSTOM_FIELD, DROPDOWN, IField, TEXT } from "~/Component/Common/SearchForm/common"
import { SearchStudentLookupButton } from "~/Component/Common/SearchForm/SearchLookups/SearchStudentLookup"

export const ProgramApplicationSearchMeta: IField[] = [
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
    fieldName: "programName"
  },
  {
    label: "Status",
    inputType: DROPDOWN,
    fieldName: "applicationStatus",
    refLookupService: getProgramApplicationStatusCodes,
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
    label: "Student",
    fieldName: "studentID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchStudentLookupButton
  }
]
