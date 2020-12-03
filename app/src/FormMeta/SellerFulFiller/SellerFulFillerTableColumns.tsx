import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
import { findSellerFulfillers } from "~/ApiServices/BizApi/product/productIf"

export const getSellerFulFillerTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    { title: "Name", dataIndex: "OrganizationName" },
    { title: "Description", dataIndex: "OrganizationDescriptor" }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: findSellerFulfillers }
}
