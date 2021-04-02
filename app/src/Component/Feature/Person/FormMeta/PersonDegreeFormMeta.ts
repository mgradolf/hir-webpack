import { DATE_PICKER, DROPDOWN, IField, NUMBER, TEXT } from "~/Component/Common/Form/common"
import { getSchoolCode, getCredentialType, getExitReasons } from "~/ApiServices/Service/RefLookupService"

export const PersonDegreeFormMeta: IField[] = [
  {
    label: "School Code",
    inputType: DROPDOWN,
    refLookupService: getSchoolCode,
    fieldName: "SchoolCodeID",
    displayKey: "Description",
    valueKey: "ID"
  },
  {
    label: "School/Establishment Name",
    inputType: TEXT,
    fieldName: "EstablishmentName"
  },
  {
    label: "Credetial Type",
    inputType: DROPDOWN,
    refLookupService: getCredentialType,
    fieldName: "CredentialTypeID",
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Lic/Cert Name",
    inputType: TEXT,
    fieldName: "CredentialName"
  },
  {
    label: "Lic/Cert Number",
    inputType: NUMBER,
    fieldName: "CredentialNumber"
  },
  {
    label: "Start Date",
    inputType: DATE_PICKER,
    fieldName: "StartDate"
  },
  {
    label: "End Date",
    inputType: DATE_PICKER,
    fieldName: "ExitDate"
  },
  {
    label: "Exit Reason",
    inputType: DROPDOWN,
    refLookupService: getExitReasons,
    fieldName: "ExitReasonCodeID",
    displayKey: "Name",
    valueKey: "ID"
  }
]
