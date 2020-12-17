import React from "react"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
import ProductRemoveLink from "~/Component/Section/Product/ProductRemoveLink"
import { findSectionProducts } from "~/ApiServices/BizApi/product/productIf"

export const getSectionProductTableColumns = (sectionID: number): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Product Name",
      dataIndex: "ProductName"
    },
    {
      title: "Current Status",
      dataIndex: "currentStatus"
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => <ProductRemoveLink sectionId={sectionID} productId={record.ProductID} />
    }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: findSectionProducts }
}
