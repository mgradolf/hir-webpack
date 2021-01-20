import { getAccountTypes } from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"

export const OfferingTypeSearchMeta: IFilterField[] = [
  {
    label: "Type Name",
    inputType: TEXT,

    fieldName: "OfferingTypeName",
    ariaLabel: "Type Name"
  },
  {
    label: "Offering Name",
    inputType: TEXT,

    fieldName: "Name",
    ariaLabel: "Offering Name"
  },
  {
    label: "Offering Code",
    inputType: TEXT,

    fieldName: "OfferingCode",
    ariaLabel: "Offering Code"
  },
  //TODO: department dropdown

  {
    label: "Department",
    inputType: DROPDOWN,

    fieldName: "OrganizationID",
    ariaLabel: "Department",
    refLookupService: getAccountTypes,
    displayKey: "Name",
    valueKey: "ID"
  }
]
