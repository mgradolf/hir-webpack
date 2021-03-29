import React from "react"
import { Link } from "react-router-dom"
import { searchPaymentDetailsByPaymentID } from "~/ApiServices/BizApi/query/queryIf"
import { renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"

export const getPaymentAllocationsTableColumns = (isModal = false, SectionID?: number): ITableConfigProp => {
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
    {
      title: "Order Date",
      dataIndex: "OrderDate",
      render: renderDate
    },
    {
      title: "Item Description",
      dataIndex: "ItemDescription"
    },
    {
      title: "GL",
      dataIndex: "GLAccountName"
    },
    {
      title: "Description",
      dataIndex: "FinancialDescription"
    },
    {
      title: "Charge Amount",
      dataIndex: "RefundAmount"
    },
    {
      title: "Allocated Amount",
      dataIndex: "PaymentLineAmount"
    }
  ]

  return { columns, searchFunc: searchPaymentDetailsByPaymentID, tableName: "PaymentAllocationsTableColumns" }
}
