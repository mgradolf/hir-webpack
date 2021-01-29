import { getOrganizationTypes } from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, IField, TEXT } from "~/Component/Common/Form/common"

export const OrganizationSearchMeta: IField[] = [
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
