import {
  getOrganizations,
  getProgramStatusCodes,
  getProgramApplicationStatusCodes,
  getProgramEnrollmentStatusCodes
} from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"
import { getOrganizationByType } from "~/ApiServices/BizApi/organization/orgIF"
import { SearchStudentLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchStudentLookup"

export const ProgramSearchMeta: IFilterField[] = [
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

    fieldName: "programStatusCodeID",
    ariaLabel: "Program Status Select",
    refLookupService: getProgramStatusCodes,
    displayKey: "Name",
    valueKey: "StatusID"
  },
  {
    label: "Department",
    inputType: DROPDOWN,
    fieldName: "departmentID",
    ariaLabel: "Department Select",
    refLookupService: getOrganizations,
    displayKey: "Description",
    valueKey: "OrganizationID"
  }
]

export const ProgramApplicationSeaarchMeta: IFilterField[] = [
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

export const ProgramEnrollmentMeta: IFilterField[] = [
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
    label: "Student Name",
    fieldName: "studentID",
    customFilterComponent: SearchStudentLookupButton
  }
]
