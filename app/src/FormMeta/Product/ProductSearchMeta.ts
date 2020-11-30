import {
  getDeliveryModes,
  getProductCategoryTypes,
  getProductDefinitions,
  getProductTypes
} from "~/ApiServices/Service/RefLookupService"
import { BOOLEAN, DROPDOWN, IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"

export const ProductSearchMeta: IFilterField[] = [
  {
    label: "Product Name",
    inputType: TEXT,

    fieldName: "ProductName",
    ariaLabel: "Product Name"
  },
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
    label: "Product Type",
    fieldName: "ProductTypeName",
    refLookupService: getProductTypes,
    inputType: DROPDOWN,
    displayKey: "Name",
    valueKey: "ProductTypeID"
  }, //: "*",
  {
    label: "Definition Name",
    fieldName: "ProductDefinitionName",
    inputType: DROPDOWN,
    refLookupService: getProductDefinitions,
    displayKey: "Name",
    valueKey: "ProductDefinitionID"
  }, //: "*",
  { label: "SKU", fieldName: "ProductSKUNumber", inputType: TEXT }, //: "*",
  { label: "Seller", fieldName: "ProductSellerID", inputType: TEXT }, //: 1,
  { label: "Fulfiller", fieldName: "ProductFulfillerID", inputType: TEXT }, //: 1,
  {
    label: "Delivery Mode",
    fieldName: "ProductDeliveryModeID",
    inputType: DROPDOWN,
    refLookupService: getDeliveryModes,
    displayKey: "Name",
    valueKey: "ID"
  }, //: 1,
  { label: "Active", fieldName: "ProductIsActive", inputType: BOOLEAN }, //: true,
  { label: "Optional Item", fieldName: "ProductOptionalItem", inputType: BOOLEAN }, //: true,
  { label: "Inventory Units", fieldName: "ProductInventoryUnits", inputType: TEXT } //: 99999979,
]

/*

      "ProductOptionalItem" : true,
      "ProductInventoryUnits" : 1
      only for sections, but hidden

      isActive in section hidden parameter

*/
