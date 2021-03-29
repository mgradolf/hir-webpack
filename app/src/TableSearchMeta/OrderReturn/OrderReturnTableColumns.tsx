import { getReturnItems } from "~/ApiServices/Service/OrderService"
import { renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"

export const getOrderReturnTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Return Date",
      dataIndex: "DateReturned",
      render: renderDate
    },
    { title: "Item", dataIndex: "ItemName" },
    { title: "Quantity", dataIndex: "ReturnedQuantity" },
    { title: "Note", dataIndex: "ReturnedNote" }
  ]

  return { columns, searchFunc: getReturnItems, tableName: "OrderReturnTableColumns" }
}
