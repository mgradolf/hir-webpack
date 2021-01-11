// import { getOrganizationByType } from "~/ApiServices/BizApi/org/orgIf"
import { getOrganizationTypes } from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"
// import { SearchPersonLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchPersonLookup"

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
  // ,
  // {
  //   label: "Principal Contact",
  //   fieldName: "PersonID",
  //   customFilterComponent: SearchPersonLookupButton
  // }
]
