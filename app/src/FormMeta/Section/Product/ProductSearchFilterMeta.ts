import { getProductCategoryTypes } from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"

const productMeta: IFilterField[] = [
  {
    label: "Product Name",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "ProductName",
    ariaLabel: "Product Name"
  },
  {
    label: "Product Category",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "ProductCategoryID",
    ariaLabel: "Product Category Select",
    refLookupService: getProductCategoryTypes,
    displayKey: "Name",
    valueKey: "ID"
  }
]

export default productMeta
