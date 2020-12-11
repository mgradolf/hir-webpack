import React from "react"
import { Link } from "react-router-dom"
import { searchProducts } from "~/ApiServices/Service/ProductService"
import { renderBoolean, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getProductTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    { title: "Product Category", dataIndex: "ProductCategoryName" },
    {
      title: "Product Name",
      dataIndex: "ProductName",
      render: (text: any, record: any) =>
        !isModal ? <Link to={`/product/${record.ProductID}`}>{text}</Link> : { text }
    },
    // { title: "SKU Number", dataIndex: "ProductSKUNumber" },
    { title: "Inventory Units", dataIndex: "ProductInventoryUnits" },
    // { title: "Delivery Mode", dataIndex: "ProductDeliveryModeName" },
    // { title: "Product Type", dataIndex: "ProductTypeName" },
    // { title: "Product Definition ", dataIndex: "ProductDefinitionName" },
    // { title: "Seller", dataIndex: "ProductSellerName" },
    // { title: "Fulfiller", dataIndex: "ProductFulfillerName" },
    { title: "Active", dataIndex: "ProductIsActive", render: renderBoolean }
    // { title: "Optional Item", dataIndex: "OptionalItem", render: renderBoolean }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: searchProducts }
}
