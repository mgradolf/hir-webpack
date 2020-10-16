import moment from "moment"
import React from "react"
import { getOrderItems } from "~/ApiServices/Service/OrderService"
import OrderItemsTable from "~/Component/Common/ResponsiveTable"
interface IOrderItems {
  OrderID: number
  SectionID: number
}
export default function OrderItems({ OrderID, SectionID }: IOrderItems) {
  return (
    <OrderItemsTable
      searchFunc={getOrderItems}
      searchParams={{ OrderID }}
      columns={[
        {
          title: "Order ID",
          dataIndex: "OrderID"
        },
        {
          title: "Order Date",
          dataIndex: "OrderDate",
          render: (text: any) => (text !== null ? moment(text).format("YYYY-MM-DD") : "")
        },
        {
          title: "Purchaser",
          dataIndex: "PurchaserName"
        },
        {
          title: "Item",
          dataIndex: "ItemName"
        },
        {
          title: "Quantity",
          dataIndex: "Quantity"
        },
        {
          title: "Balance",
          dataIndex: "Balance"
        },
        {
          title: "Due Date",
          dataIndex: "PaymentDueDate",
          render: (text: any) => (text !== null ? moment(text).format("YYYY-MM-DD") : "")
        }
      ]}
    />
  )
}
