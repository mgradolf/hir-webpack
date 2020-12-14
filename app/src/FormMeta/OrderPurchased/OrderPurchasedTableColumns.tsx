import React from "react"
import { Link } from "react-router-dom"
import { getPurchaseOrders } from "~/ApiServices/Service/OrderService"
import { renderBoolean, renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getOrderPurchasedTableColumns = (isModal = false, SectionID?: number): ITableConfigProp => {
  const columns: TableColumnType = [
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
    },
    { title: "PO Number", dataIndex: "PONumber" },
    {
      title: "Payment Due Date",
      dataIndex: "PaymentDueDate",
      render: renderDate
    },
    { title: "Issuing Organization", dataIndex: "AccountName" },
    {
      title: "Contact Person",
      dataIndex: "ContactPerson",
      render: (text: any, record: any) => (isModal ? text : <Link to={`/person/${record.PersonID}`}>{text}</Link>)
    },
    { title: "Amount", dataIndex: "POAmount" },
    { title: "Payment Received", dataIndex: "IsPaymentReceived", render: renderBoolean }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: getPurchaseOrders }
}
