import moment from "moment"
import React from "react"
import { getCredit } from "~/ApiServices/Service/OrderService"
import OrderCreditsTable from "~/Component/Common/ResponsiveTable"
interface IOrderlines {
  OrderID: number
}
export default function Orderlines({ OrderID }: IOrderlines) {
  return (
    <OrderCreditsTable
      searchFunc={getCredit}
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
          title: "Credit ID",
          dataIndex: "CreditMemoID"
        },
        {
          title: "Credit Date",
          dataIndex: "CreditMemoDate",
          render: (text: any) => (text !== null ? moment(text).format("YYYY-MM-DD") : "")
        },
        {
          title: "Credit Status",
          dataIndex: "CreditMemoStatus"
        },
        {
          title: "Item Description",
          dataIndex: "OrderItemDescription"
        },
        {
          title: "Details",
          dataIndex: "AssociatedFinance"
        },
        {
          title: "Total Amount",
          dataIndex: "TotalAmount"
        },
        {
          title: "Cash Credit",
          dataIndex: "RefundAmountss"
        }
      ]}
    />
  )
}
