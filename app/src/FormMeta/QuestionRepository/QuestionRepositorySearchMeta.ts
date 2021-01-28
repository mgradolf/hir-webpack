import { getOrganizations, getPreferenceValueType } from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, IField, TEXT } from "~/Component/Common/Form/common"

export const QuestionRepositorySearchMeta: IField[] = [
  {
    label: "Question",
    inputType: TEXT,
    fieldName: "Name"
  },
  {
    label: "Organization",
    inputType: DROPDOWN,
    fieldName: "OrganizationID",
    refLookupService: getOrganizations,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Type",
    inputType: DROPDOWN,
    fieldName: "PreferenceValueTypeID",
    refLookupService: getPreferenceValueType,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Is Active",
    inputType: DROPDOWN,
    options: [
      { label: "Yes", value: "true" },
      { label: "No", value: "false" }
    ],
    fieldName: "IsActive"
  }
]
