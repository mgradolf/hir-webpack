import { getOrganizationByType } from "~/ApiServices/BizApi/org/orgIf"
import { getOrganizationTypes } from "~/ApiServices/Service/RefLookupService"
import { CUSTOM_FIELD, DROPDOWN, IField } from "~/Component/Common/SearchForm/common"
import { SearchPersonLookupButton } from "~/Component/Common/SearchForm/SearchLookups/SearchPersonLookup"

export const UserSearchMeta: IField[] = [
  {
    label: "Type",
    inputType: DROPDOWN,
    fieldName: "OrganizationTypeID",
    refLookupService: getOrganizationTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Name",
    inputType: DROPDOWN,
    fieldName: "OrganizationID",
    refLookupService: getOrganizationByType,
    displayKey: "Name",
    valueKey: "OrganizationID"
  },
  {
    label: "Principal Contact",
    fieldName: "PersonID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchPersonLookupButton
  }
]
