import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { findSellerFulfillers } from "~/ApiServices/BizApi/product/productIf"

export const getSellerFulFillerTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    { title: "Name", dataIndex: "OrganizationName" },
    { title: "Description", dataIndex: "OrganizationDescriptor" }
  ]

  return { columns, searchFunc: findSellerFulfillers, tableName: "SellerFulFillerTableColumns" }
}
