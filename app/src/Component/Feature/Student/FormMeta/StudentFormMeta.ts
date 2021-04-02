import { DATE_PICKER, DROPDOWN, IField } from "~/Component/Common/Form/common"
import { getOrganizations, getAcademicStandingType, getStudentStatusCode } from "~/ApiServices/Service/RefLookupService"

export const StudentFormMeta: IField[] = [
  {
    label: "Organization",
    inputType: DROPDOWN,
    refLookupService: getOrganizations,
    fieldName: "OrganizationID",
    displayKey: "Name",
    valueKey: "OrganizationID"
  },
  {
    label: "Start Date",
    inputType: DATE_PICKER,
    fieldName: "StartDate"
  },
  {
    label: "End Date",
    inputType: DATE_PICKER,
    fieldName: "EndDate"
  },
  {
    label: "Academic Standing",
    inputType: DROPDOWN,
    refLookupService: getAcademicStandingType,
    fieldName: "AcademicStandingTypeID",
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Status",
    inputType: DROPDOWN,
    refLookupService: getStudentStatusCode,
    fieldName: "StudentStatusCodeID",
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Commuter",
    inputType: DROPDOWN,
    fieldName: "IsCommuter",
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false }
    ]
  },
  {
    label: "Solicit For Marketing",
    inputType: DROPDOWN,
    fieldName: "AllowMarketing",
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false }
    ]
  },
  {
    label: "Active",
    inputType: DROPDOWN,
    fieldName: "IsActive",
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false }
    ]
  }
]
