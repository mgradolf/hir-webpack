import { getOrganizationTypes } from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"

export const OrganizationSearchMeta: IFilterField[] = [
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
    inputType: TEXT,
    fieldName: "Name"
  }
]
