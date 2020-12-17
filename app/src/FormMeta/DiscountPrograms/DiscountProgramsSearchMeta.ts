import { getDiscountTypes } from "~/ApiServices/Service/RefLookupService"
import { BOOLEAN, DROPDOWN, IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"

export const DiscountProgramsSearchMeta: IFilterField[] = [
  {
    label: "Discount Program Type",
    inputType: DROPDOWN,
    fieldName: "DiscountTypeID",
    ariaLabel: "Account Type Select",
    refLookupService: getDiscountTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Name",
    inputType: TEXT,
    fieldName: "Name"
  },
  {
    label: "Is Promoted For Marketing",
    inputType: BOOLEAN,
    fieldName: "IsPromotedForMarketing"
  },
  {
    label: "Is Active",
    inputType: BOOLEAN,
    fieldName: "IsActive"
  }
]
