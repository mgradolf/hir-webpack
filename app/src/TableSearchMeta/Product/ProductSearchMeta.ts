import { getProductCategoryTypes } from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, IField, NUMBER, TEXT } from "~/Component/Common/Form/common"

export const ProductSearchMeta: IField[] = [
  {
    label: "Product Category",
    inputType: DROPDOWN,
    fieldName: "ProductCategoryID",
    refLookupService: getProductCategoryTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Product Name",
    inputType: TEXT,
    fieldName: "ProductName"
  },
  {
    label: "Optional Item",
    fieldName: "ProductOptionalItem",
    inputType: DROPDOWN,
    options: [
      { label: "Yes", value: "true" },
      { label: "No", value: "false" }
    ]
  },
  {
    label: "Active",
    fieldName: "ProductIsActive",
    inputType: DROPDOWN,
    options: [
      { label: "Yes", value: "true" },
      { label: "No", value: "false" }
    ]
  },
  { label: "Inventory Units", fieldName: "ProductInventoryUnits", inputType: NUMBER }
]

/*

      "ProductOptionalItem" : true,
      "ProductInventoryUnits" : 1
      only for sections, but hidden

      isActive in section hidden parameter

*/
