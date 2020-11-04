import React from "react"
import { getReturnItems } from "~/ApiServices/Service/OrderService"
import { renderDate, ResponsiveTable } from "~/Component/Common/ResponsiveTable"
interface IOrderReturnItems {
  OrderID: number
}
export default function OrderReturnItems({ OrderID }: IOrderReturnItems) {
  return (
    <ResponsiveTable
      columns={[
        { title: "Returned Quantity", dataIndex: "ReturnedQuantity" },
        {
          title: "Date Returned",
          dataIndex: "DateReturned",
          render: renderDate
        },
        { title: "Return Note", dataIndex: "ReturnedNote" }
      ]}
      searchFunc={getReturnItems}
      searchParams={{ OrderItemID: OrderID }}
      pagination={false}
    />
  )
}
