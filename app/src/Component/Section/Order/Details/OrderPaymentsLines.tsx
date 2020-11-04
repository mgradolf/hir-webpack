import moment from "moment"
import React from "react"
import { getPayment } from "~/ApiServices/Service/OrderService"
import { ResponsiveTable } from "~/Component/Common/ResponsiveTable"
interface IOrderPaymentLines {
  OrderID: number
}
export default function OrderPaymentLines({ OrderID }: IOrderPaymentLines) {
  return (
    <ResponsiveTable
      searchFunc={getPayment}
      searchParams={{ OrderID }}
      columns={[
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
          render: (text: any) => (text !== null ? moment(text).format("YYYY-MM-DD") : "")
        },
        {
          title: "Completed Date",
          dataIndex: "CompletedDate",
          render: (text: any) => (text !== null ? moment(text).format("YYYY-MM-DD") : "")
        },
        {
          title: "Ammount Paid",
          dataIndex: "TotalPaymentAmount"
        },
        {
          title: "Cash Credit",
          dataIndex: "RefundAmount"
        }
      ]}
    />
  )
}
