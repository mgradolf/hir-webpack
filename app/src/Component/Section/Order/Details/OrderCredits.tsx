import React from "react"
import { getCredit } from "~/ApiServices/Service/OrderService"
import { renderDate, ResponsiveTable } from "~/Component/Common/ResponsiveTable"
interface IOrderlines {
  OrderID: number
}
export default function Orderlines({ OrderID }: IOrderlines) {
  return (
    <ResponsiveTable
      searchFunc={getCredit}
      searchParams={{ OrderID }}
      columns={[
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
      ]}
    />
  )
}
