import { ColumnsType } from "antd/lib/table"
import React from "react"
import { RecordType } from "~/Component/Common/ResponsiveTable"
import SearchPage from "~/Component/Common/Page/SearchPage"
import { searchOrders } from "~/ApiServices/Service/OrderService"
import { OrderManagementSearchFilterMeta } from "~/Component/Section/Order/OrderManagementFilters/OrderManagementFiltersMeta"
import moment from "moment"
import { Link } from "react-router-dom"

export default function PersonTable() {
  const columns: ColumnsType<RecordType> = [
    {
      title: "Order ID",
      dataIndex: "OrderID",
      width: 100,
      render: (text: any, record: any) => {
        return <Link to={`/order/${record.OrderID}`}>{text}</Link>
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
      render: (text: any) => (text !== null ? moment(text).format("YYYY-MM-DD") : ""),
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
      render: (text: any) => (text !== null ? moment(text).format("YYYY-MM-DD") : ""),
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
      render: (text: any) => (text !== null ? moment(text).format("YYYY-MM-DD") : ""),
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
  return (
    <SearchPage
      title="Orders"
      meta={OrderManagementSearchFilterMeta}
      hideSearchField={false}
      tableProps={{
        columns: columns,
        searchFunc: searchOrders,
        rowKey: "OrderID",
        pagination: { position: ["topLeft"], pageSize: 20 }
      }}
    ></SearchPage>
  )
}
