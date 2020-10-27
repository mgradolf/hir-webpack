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
