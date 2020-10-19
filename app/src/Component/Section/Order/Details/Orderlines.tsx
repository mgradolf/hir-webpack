import React from "react"
import { getOrderLines } from "~/ApiServices/Service/OrderService"
import OrderlinesTable from "~/Component/Common/ResponsiveTable"
interface IOrderlines {
  OrderID: number
}
export default function Orderlines({ OrderID }: IOrderlines) {
  return (
    <OrderlinesTable
      searchFunc={getOrderLines}
      searchParams={{ OrderID }}
      columns={[
        {
          title: "Line ID",
          dataIndex: "OrderLineID"
        },
        {
          title: "Quantity",
          dataIndex: "Quantity"
        },
        {
          title: "Item Description",
          dataIndex: "ItemDescription"
        },
        {
          title: "Details",
          dataIndex: "FinancialDescription"
        },
        {
          title: "Unit Price",
          dataIndex: "UnitPrice"
        },
        {
          title: "Total Amount",
          dataIndex: "TotalAmount"
        }
      ]}
    />
  )
}
