import { getOrganizations, getPreferenceValueType } from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"

export const QuestionRepositorySearchMeta: IFilterField[] = [
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
