import { getCredit } from "~/ApiServices/Service/OrderService"
import { renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getOrderCreditsTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Credit ID",
      dataIndex: "CreditMemoID"
    },
    {
      title: "Credit Date",
      dataIndex: "CreditMemoDate",
      render: renderDate
    },
    {
      title: "Credit Status",
      dataIndex: "CreditStatus"
    },
    {
      title: "Item Description",
      dataIndex: "orderItemDescription"
    },
    {
      title: "Details",
      dataIndex: "FinancialDescription"
    },
    {
      title: "Total Amount",
      dataIndex: "Amount"
    },
    {
      title: "Cash Credit",
      dataIndex: "RefundAmount"
    }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: getCredit }
}
