import moment from "moment"
import React from "react"
import { getReturnItems } from "~/ApiServices/Service/OrderService"
import { ResponsiveTable } from "~/Component/Common/ResponsiveTable"
import { DATE_FORMAT } from "~/utils/Constants"
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
          render: (text: any) => (text !== null ? moment(text).format(DATE_FORMAT) : "")
        },
        { title: "Return Note", dataIndex: "ReturnedNote" }
      ]}
      searchFunc={getReturnItems}
      searchParams={{ OrderItemID: OrderID }}
      pagination={false}
    />
  )
}
