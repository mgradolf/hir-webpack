import React from "react"
import { Link } from "react-router-dom"
import { searchCreditMemo } from "~/ApiServices/BizApi/payment/paymentIF"
import { renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getPaymentCreditMemoTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    { title: "CreditMemoID", dataIndex: "CreditMemoID" },
    {
      title: "BuyerName",
      dataIndex: "BuyerName",
      render: (text: any, record: any) => (isModal ? text : <Link to={`/person/${record.PersonID}`}>{text}</Link>)
    },
    { title: "Cash Credit Amount", dataIndex: "CashCreditAmount" },
    { title: "Charge Amount", dataIndex: "ChargeAmount" },
    { title: "Credit Amount", dataIndex: "CreditAmount" },
    { title: "CreditMemo Date", dataIndex: "CreditMemoDate", render: renderDate },
    { title: "CreditMemo Status", dataIndex: "CreditMemoStatus" },
    { title: "Credit Reason", dataIndex: "CreditReason" },
    { title: "Financial Description", dataIndex: "FinancialDescription" },
    { title: "Item Name", dataIndex: "ItemName" },
    { title: "Number Of Seats", dataIndex: "NumberOfSeats" },
    { title: "Order Date", dataIndex: "OrderDate", render: renderDate },
    {
      title: "Order ID",
      dataIndex: "OrderID",
      render: (text: any, record: any) => (isModal ? text : <Link to={`/order/${record.OrderID}`}>{text}</Link>)
    },
    { title: "Refund Amount", dataIndex: "RefundAmount" },
    {
      title: "SectionID",
      dataIndex: "SectionID",
      render: (text: any, record: any) => (isModal ? text : <Link to={`/section/${record.SectionID}`}>{text}</Link>)
    }
  ]
  return { columns, searchFunc: searchCreditMemo }
}
