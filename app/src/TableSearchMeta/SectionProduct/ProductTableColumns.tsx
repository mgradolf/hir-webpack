import React from "react"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import ProductRemoveLink from "~/Component/Feature/Section/Product/ProductRemoveLink"
import { findSectionProducts } from "~/ApiServices/BizApi/product/productIf"
import { Link } from "react-router-dom"

export const getSectionProductTableColumns = (): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Section Number",
      dataIndex: "SectionNumber",
      render: (text: any, record: any) => <Link to={`/section/${record.SectionID}`}>{text}</Link>
    },
    {
      title: "Offering Name",
      dataIndex: "OfferingName",
      render: (text: any, record: any) => <Link to={`/offering/${record.OfferingID}`}>{text}</Link>
    },
    {
      title: "Product Name",
      dataIndex: "ProductName",
      render: (text: any, record: any) => <Link to={`/product/${record.ProductID}`}>{text}</Link>
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => <ProductRemoveLink sectionId={record.SectionID} productId={record.ProductID} />
    }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: findSectionProducts }
}
