import React from "react"
import { Link } from "react-router-dom"
import { searchMarketingCodeResponses } from "~/ApiServices/Service/MarketingService"
import { renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
import { ReadOutlined } from "@ant-design/icons"

export const getMarketingCodeResponseTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      render: (text: any, record: any) =>
        isModal ? (
          text
        ) : (
          <Link to={`/marketing-codes/response/${record.OrderItemID}/${record.MarketingCodeID}`}>
            <ReadOutlined />
          </Link>
        )
    },
    {
      title: "Marketing Code",
      dataIndex: "MarketingCode",
      render: (text: any, record: any) =>
        isModal ? text : <Link to={`/marketing-codes/repository/${record.MarketingCodeID}`}>{text}</Link>
    },
    {
      title: "Purchaser Name",
      dataIndex: "PurchaserName",
      render: (text: any, record: any) => (isModal ? text : <Link to={`/person/${record.PersonID}`}>{text}</Link>)
    },
    {
      title: "Category",
      dataIndex: "CategoryName"
    },
    {
      title: "Order ID",
      dataIndex: "OrderID",
      render: (text: any, record: any) => (isModal ? text : <Link to={`/order/${record.OrderID}`}>{text}</Link>)
    },
    {
      title: "Order Date",
      dataIndex: "OrderDate",
      render: renderDate
    },
    {
      title: "Account Name",
      dataIndex: "AccountName",
      render: (text: any, record: any) => (isModal ? text : <Link to={`/account/${record.AccountID}`}>{text}</Link>)
    },
    {
      title: "Item Description",
      dataIndex: "ItemDescription"
    }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: searchMarketingCodeResponses }
}
