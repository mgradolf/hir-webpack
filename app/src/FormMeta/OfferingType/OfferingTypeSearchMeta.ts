import { getOrganizations } from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"

export const OfferingTypeSearchMeta: IFilterField[] = [
  {
    label: "Type Name",
    inputType: TEXT,
    fieldName: "OfferingTypeName"
  },
  {
    label: "Offering Name",
    inputType: TEXT,
    fieldName: "Name"
  },
  {
    label: "Offering Code",
    inputType: TEXT,
    fieldName: "OfferingCode"
  },
  {
    label: "Department",
    fieldName: "organizationID",
    inputType: DROPDOWN,
    refLookupService: getOrganizations,
    displayKey: "Name",
    valueKey: "OrganizationID"
  }
]
