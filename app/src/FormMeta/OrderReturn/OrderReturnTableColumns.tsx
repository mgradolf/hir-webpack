import { getReturnItems } from "~/ApiServices/Service/OrderService"
import { renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getOrderReturnTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    { title: "Returned Quantity", dataIndex: "ReturnedQuantity" },
    {
      title: "Date Returned",
      dataIndex: "DateReturned",
      render: renderDate
    },
    { title: "Return Note", dataIndex: "ReturnedNote" }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: getReturnItems }
}
