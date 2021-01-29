import { getOrganizationByType } from "~/ApiServices/BizApi/org/orgIf"
import { getOrganizationTypes } from "~/ApiServices/Service/RefLookupService"
import { CUSTOM_FIELD, DROPDOWN, IField } from "~/Component/Common/Form/common"
import { PersonLookup } from "~/Component/Common/Form/FormLookupFields/PersonLookup"

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
    customFilterComponent: PersonLookup
  }
]
