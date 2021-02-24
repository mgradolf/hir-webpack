import React from "react"
import { Link } from "react-router-dom"
import { searchProducts } from "~/ApiServices/Service/ProductService"
import { renderBoolean, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"

export const getProductTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Product Name",
      dataIndex: "ProductName",
      render: (text: any, record: any) => (!isModal ? <Link to={`/product/${record.ProductID}`}>{text}</Link> : text)
    },
    { title: "Product Category", dataIndex: "ProductCategoryName" },
    { title: "Inventory Units", dataIndex: "ProductInventoryUnits" },

    { title: "Active", dataIndex: "ProductIsActive", render: renderBoolean }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: searchProducts }
}
