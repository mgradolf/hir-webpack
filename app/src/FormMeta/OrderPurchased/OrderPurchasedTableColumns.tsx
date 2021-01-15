import React from "react"
import { Link } from "react-router-dom"
import { getPurchaseOrders } from "~/ApiServices/Service/OrderService"
import { renderBoolean, renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getOrderPurchasedTableColumns = (isModal = false, SectionID?: number): ITableConfigProp => {
  const columns: TableColumnType = [
    { title: "Payment Received", dataIndex: "IsPaymentReceived", render: renderBoolean },
    {
      title: "Payment Due Date",
      dataIndex: "PaymentDueDate",
      render: renderDate
    },
    { title: "PO Number", dataIndex: "PONumber" },
    { title: "Amount", dataIndex: "POAmount" },
    {
      title: "Order ID",
      dataIndex: "OrderID",
      render: (text: any, record: any) =>
        isModal ? (
          text
        ) : SectionID ? (
          <Link to={`/section/${SectionID}/order/${record.OrderID}`}>{text}</Link>
        ) : (
          <Link to={`/order/${record.OrderID}`}>{text}</Link>
        )
    }    
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: getPurchaseOrders }
}
