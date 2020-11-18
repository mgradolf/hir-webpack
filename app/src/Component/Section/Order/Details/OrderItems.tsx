import React from "react"
import { getOrderItems } from "~/ApiServices/Service/OrderService"
import { ResponsiveTable } from "~/Component/Common/ResponsiveTable"
interface IOrderItems {
  OrderID: number
  SectionID: number
}
export default function OrderItems({ OrderID, SectionID }: IOrderItems) {
  return (
    <ResponsiveTable
      searchFunc={getOrderItems}
      searchParams={{ OrderID }}
      columns={[
        {
          title: "Item ID",
          dataIndex: "OrderItemID"
        },
        {
          title: "Purchased Name",
          dataIndex: "PurchaserName"
        },
        {
          title: "Item Name",
          dataIndex: "ItemName"
        },
        {
          title: "Price",
          dataIndex: "Amount"
        },
        {
          title: "Discount",
          dataIndex: "DiscountAmount"
        },
        {
          title: "Credit",
          dataIndex: "CreditAmount"
        },
        {
          title: "Net Price",
          dataIndex: "NetPrice"
        },
        {
          title: "Payment Amount",
          dataIndex: "PaymentAmount"
        },
        {
          title: "Refund Amount",
          dataIndex: "RefundAmount"
        },

        {
          title: "Balance",
          dataIndex: "Balance"
        }
      ]}
    />
  )
}
