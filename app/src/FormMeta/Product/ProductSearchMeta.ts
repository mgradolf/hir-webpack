import { getProductCategoryTypes } from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, IFilterField, NUMBER, TEXT } from "~/Component/Common/SearchFilters/common"

export const ProductSearchMeta: IFilterField[] = [
  {
    label: "Product Category",
    inputType: DROPDOWN,
    fieldName: "ProductCategoryID",
    ariaLabel: "Product Category Select",
    refLookupService: getProductCategoryTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Product Name",
    inputType: TEXT,
    fieldName: "ProductName",
    ariaLabel: "Product Name"
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
  { label: "Inventory Units", fieldName: "ProductInventoryUnits", inputType: NUMBER } //: 99999979,
]

/*

      "ProductOptionalItem" : true,
      "ProductInventoryUnits" : 1
      only for sections, but hidden

      isActive in section hidden parameter

*/
