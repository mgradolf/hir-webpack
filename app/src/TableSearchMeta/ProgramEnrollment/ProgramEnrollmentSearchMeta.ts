import { getOrganizationByType } from "~/ApiServices/BizApi/org/orgIf"
import { getProgramEnrollmentStatusCodes } from "~/ApiServices/Service/RefLookupService"
import { CUSTOM_FIELD, DROPDOWN, IField, TEXT } from "~/Component/Common/Form/common"
import { StudentLookup } from "~/Component/Common/Form/FormLookupFields/StudentLookup"

export const ProgramEnrollmentSearchMeta: IField[] = [
  {
    label: "Program Name",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "programName"
  },
  {
    label: "Student",
    fieldName: "studentID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: StudentLookup
  },
  {
    label: "Status",
    inputType: DROPDOWN,
    fieldName: "statusIDs",
    refLookupService: getProgramEnrollmentStatusCodes,
    displayKey: "Name",
    valueKey: "StatusID"
  },
  {
    label: "Department",
    inputType: DROPDOWN,
    fieldName: "departmentID",
    refLookupService: getOrganizationByType,
    displayKey: "Name",
    valueKey: "OrganizationID"
  },
  {
    label: "Program Code",
    inputType: TEXT,
    defaultValue: "*",
    fieldName: "programCode"
  }
]
