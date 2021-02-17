import { DROPDOWN, IField, TEXT } from "~/Component/Common/Form/common"
import { getOrganizations, getInstitutionStatusTypes, getInstructorTypes } from "~/ApiServices/Service/RefLookupService"

export const InstructorFormMeta: IField[] = [
  {
    label: "Serial Num",
    inputType: TEXT,
    fieldName: "FacultySerialNum"
  },
  {
    label: "Organization",
    inputType: DROPDOWN,
    refLookupService: getOrganizations,
    fieldName: "OrganizationID",
    displayKey: "Name",
    valueKey: "OrganizationID"
  },
  {
    label: "Status",
    inputType: DROPDOWN,
    refLookupService: getInstitutionStatusTypes,
    fieldName: "InstitutionStatusCodeID",
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Type",
    inputType: DROPDOWN,
    refLookupService: getInstructorTypes,
    fieldName: "InstructorTypeID",
    displayKey: "Name",
    valueKey: "ID"
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
