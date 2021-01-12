import { BOOLEAN, IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"

const meta: IFilterField[] = [
  {
    label: "Product Name",
    inputType: TEXT,
    fieldName: "ProductName"
  },
  {
    label: "Product Category",
    inputType: TEXT,
    fieldName: "ProductCategoryName"
  },
  {
    label: "Product Type",
    inputType: TEXT,
    fieldName: "ProductTypeName"
  },
  {
    label: "Product Fulfiller",
    inputType: TEXT,
    fieldName: "ProductFulfillerName"
  },
  {
    label: "Product Seller",
    inputType: TEXT,
    fieldName: "ProductSellerName"
  },
  {
    label: "Is Active",
    fieldName: "IsActive",
    inputType: BOOLEAN
  }
]

export default meta

// ProductTypeName
// ProductCategoryName
// ProductName
// ProductSellerName
// ProductFulfillerName
// IsActive
// ProductDeliveryMode
// OnlyShortProducts
