import { getPayment } from "~/ApiServices/Service/OrderService"
import { renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"

export const getOrderPaymentTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Payment Line ID",
      dataIndex: "PaymentLineID"
    },
    {
      title: "Payment ID",
      dataIndex: "PaymentID"
    },
    {
      title: "Payment Method",
      dataIndex: "PaymentAcceptedName"
    },
    {
      title: "Payment Status",
      dataIndex: "PaymentStatus"
    },
    {
      title: "Payer",
      dataIndex: "PersonName"
    },
    {
      title: "Details",
      dataIndex: "FinancialDescription"
    },
    {
      title: "Creation Date",
      dataIndex: "CreateDate",
      render: renderDate
    },
    {
      title: "Completed Date",
      dataIndex: "CompletedDate",
      render: renderDate
    },
    {
      title: "Ammount Paid",
      dataIndex: "TotalPaymentAmount"
    },
    {
      title: "Cash Credit",
      dataIndex: "RefundAmount"
    }
  ]

  return { columns, searchFunc: getPayment, tableName: "OrderPaymentTableColumns" }
}
