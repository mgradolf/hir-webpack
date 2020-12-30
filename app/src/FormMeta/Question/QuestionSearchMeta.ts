import { getOrganizations, getPreferenceValueType } from "~/ApiServices/Service/RefLookupService"
import { BOOLEAN, DROPDOWN, IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"

export const QuestionSearchMeta: IFilterField[] = [
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
    inputType: BOOLEAN,
    fieldName: "IsActive"
  }
]
