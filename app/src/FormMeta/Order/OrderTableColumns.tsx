import React from "react"
import { Link } from "react-router-dom"
import { searchOrders } from "~/ApiServices/Service/OrderService"
import { renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getOrderTableColumns = (isModal = false, OfferingID?: number, SectionID?: number): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Order ID",
      dataIndex: "OrderID",
      width: 100,
      render: (text: any, record: any) => {
        return isModal ? (
          { text }
        ) : SectionID ? (
          <Link to={`/section/${SectionID}/order/${record.OrderID}`}>{text}</Link>
        ) : (
          <Link to={`/order/${record.OrderID}`}>{text}</Link>
        )
      }
    },
    {
      title: "Order Items",
      dataIndex: "TotalItems",
      width: 100
    },
    {
      title: "Buyer Name",
      dataIndex: "BuyerName",
      width: 100
    },
    {
      title: "Account",
      dataIndex: "OrganizationName",
      width: 100
    },
    {
      title: "Creation Date",
      dataIndex: "CreateDate",
      render: renderDate,
      width: 100
    },
    {
      title: "Order Status",
      dataIndex: "OrderStatus",
      width: 100
    },
    {
      title: "Completed Date",
      dataIndex: "CompletedDate",
      render: renderDate,
      width: 100
    },
    {
      title: "Total Order Amount",
      dataIndex: "TotalAmount",
      width: 100
    },
    {
      title: "Credit Amount",
      dataIndex: "CreditAmount",
      width: 100
    },
    {
      title: "Amount Paid",
      dataIndex: "AmountPaid",
      width: 100
    },
    {
      title: "Cash Credit",
      dataIndex: "CreditAmount",
      width: 100
    },
    {
      title: "Balance",
      dataIndex: "Balance",
      width: 100
    },
    {
      title: "Payment Due Date",
      dataIndex: "PaymentDueDate",
      render: renderDate,
      width: 100
    },
    {
      title: "PO outstanding",
      dataIndex: "HasPO",
      width: 100
    },
    {
      title: "Source",
      dataIndex: "Source",
      width: 100
    }
  ]

  const responsiveColumnIndices = [17, 18, 19, 20, 21, 22, 23, 24, 25]
  const expandableColumnIndices = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: searchOrders }
}
