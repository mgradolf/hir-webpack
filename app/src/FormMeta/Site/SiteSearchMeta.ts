import { getOrganizations } from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, IField, TEXT } from "~/Component/Common/Form/common"

export const SiteSearchMeta: IField[] = [
  {
    label: "Name",
    inputType: TEXT,
    fieldName: "Name"
  },
  {
    label: "Code",
    inputType: TEXT,
    fieldName: "Code"
  },
  {
    label: "Department",
    inputType: DROPDOWN,
    fieldName: "OrganizationID",
    refLookupService: getOrganizations,
    displayKey: "Name",
    valueKey: "OrganizationID"
  }
]
