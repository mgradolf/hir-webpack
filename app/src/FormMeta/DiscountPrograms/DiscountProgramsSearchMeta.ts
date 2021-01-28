import { getDiscountTypes } from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, IField, TEXT } from "~/Component/Common/SearchForm/common"

export const DiscountProgramsSearchMeta: IField[] = [
  {
    label: "Discount Program Type",
    inputType: DROPDOWN,
    fieldName: "DiscountTypeID",
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
    label: "Promoted For Marketing",
    inputType: DROPDOWN,
    options: [
      { label: "Yes", value: "true" },
      { label: "No", value: "false" }
    ],
    fieldName: "IsPromotedForMarketing"
  },
  {
    label: "Active",
    inputType: DROPDOWN,
    options: [
      { label: "Yes", value: "true" },
      { label: "No", value: "false" }
    ],
    fieldName: "IsActive"
  }
]
