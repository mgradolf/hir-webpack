import moment from "moment"
import React from "react"
import { getPayment } from "~/ApiServices/Service/OrderService"
import OrderPaymentsTable from "~/Component/Common/ResponsiveTable"
interface IOrderPaymentLines {
  OrderID: number
}
export default function OrderPaymentLines({ OrderID }: IOrderPaymentLines) {
  return (
    <OrderPaymentsTable
      searchFunc={getPayment}
      searchParams={{ OrderID }}
      columns={[
        {
          title: "Order ID",
          dataIndex: "OrderID"
        },
        {
          title: "Order Status",
          dataIndex: "OrderStatus"
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
          title: "Gateway",
          dataIndex: "Gateway"
        },
        {
          title: "Payment Line ID",
          dataIndex: "PaymentLineID"
        },
        {
          title: "Payer",
          dataIndex: "PersonName"
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
