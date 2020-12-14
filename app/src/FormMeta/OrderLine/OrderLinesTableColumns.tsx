import { getOrderLines } from "~/ApiServices/Service/OrderService"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getOrderLinesTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Line ID",
      dataIndex: "OrderLineID"
    },
    {
      title: "Quantity",
      dataIndex: "Quantity"
    },
    {
      title: "Item Description",
      dataIndex: "ItemDescription"
    },
    {
      title: "Details",
      dataIndex: "FinancialDescription"
    },
    {
      title: "Unit Price",
      dataIndex: "UnitPrice"
    },
    {
      title: "Total Amount",
      dataIndex: "TotalAmount"
    }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: getOrderLines }
}
