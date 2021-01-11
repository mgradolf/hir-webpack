import { getProductFinancials } from "~/ApiServices/Service/ProductService"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getProductFinancialsTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    { title: "Description", dataIndex: "Description" },
    { title: "GL Acount", dataIndex: "GLAccountName" },
    { title: "Income", dataIndex: "ItemUnitAmount" }
  ]
  return { columns, searchFunc: getProductFinancials, responsiveColumnIndices: [], expandableColumnIndices: [] }
}
