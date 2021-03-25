import { getOrderLines } from "~/ApiServices/Service/OrderService"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"

export const getOrderLinesTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Item",
      dataIndex: "ItemDescription"
    },
    {
      title: "GL Account",
      dataIndex: "GLAccountName"
    },
    {
      title: "Charge Name",
      dataIndex: "FinancialDescription"
    },
    {
      title: "Quantity",
      dataIndex: "Quantity"
    },
    {
      title: "Unit Amount",
      dataIndex: "UnitPrice"
    },
    {
      title: "Total Amount",
      dataIndex: "TotalAmount"
    }
  ]
  return { columns, searchFunc: getOrderLines, tableName: "OrderLinesTableColumns" }
}
