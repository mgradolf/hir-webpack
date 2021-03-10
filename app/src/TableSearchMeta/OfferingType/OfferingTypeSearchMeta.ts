import { getOrganizations } from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, IField, TEXT } from "~/Component/Common/Form/common"

export const OfferingTypeSearchMeta: IField[] = [
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
    fieldName: "OrganizationID",
    inputType: DROPDOWN,
    refLookupService: getOrganizations,
    displayKey: "Name",
    valueKey: "OrganizationID"
  }
]
