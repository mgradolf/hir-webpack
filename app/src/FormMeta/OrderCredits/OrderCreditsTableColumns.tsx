import React from "react"
import { Link } from "react-router-dom"
import { searchCreditMemo } from "~/ApiServices/BizApi/payment/paymentIF"
import { renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getOrderCreditsTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Credit ID",
      dataIndex: "CreditMemoID",
      render: (text: any, record: any) => (isModal ? text : <Link to={`/order/${record.OrderID}`}>{text}</Link>)
    },
    {
      title: "Credit Date",
      dataIndex: "CreditMemoDate",
      render: renderDate
    },
    {
      title: "Item",
      dataIndex: "ItemName"
    },
    {
      title: "Charge Name",
      dataIndex: "FinancialDescription"
    },
    {
      title: "Credit Reason",
      dataIndex: "CreditReason"
    },
    {
      title: "Discount Program",
      dataIndex: "DiscountProgramName",
      render: (text: any, record: any) =>
        isModal ? text : <Link to={`/discount-program/${record.DiscountProgramID}`}>{text}</Link>
    },
    {
      title: "Charged Amount",
      dataIndex: "ChargeAmount"
    },
    {
      title: "Credit Amount",
      dataIndex: "CreditAmount"
    },
    {
      title: "Refund",
      dataIndex: "RefundAmount"
    }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: searchCreditMemo }
}
