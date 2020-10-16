import React, { useState } from "react"
import { Link, RouteComponentProps } from "react-router-dom"
import { searchOrders } from "~/ApiServices/Service/OrderService"
import OrderManagementSearch from "~/Component/Common/SearchFilters"
import EnrollmentLogTable, { RecordType } from "~/Component/Common/ResponsiveTable"
import { OrderManagementSearchFilterMeta } from "~/Component/Section/Order/OrderManagementFilters/OrderManagementFiltersMeta"
import { ColumnsType } from "antd/lib/table"

export default function OrderLogPage(props: RouteComponentProps<{ sectionID: string }>) {
  const SectionID = Number(props.match.params.sectionID)
  const [searchParams, setSearchParams] = useState<{ [key: string]: any }>({ SectionIDs: [SectionID] })
  const columns: ColumnsType<RecordType> = [
    {
      title: "Order ID",
      dataIndex: "OrderID",
      width: 100,
      render: (text: any, record: any) => <Link to={`/section/${SectionID}/order/${record.OrderID}`}>{text}</Link>
    },
    {
      title: "Other Items",
      dataIndex: "OtherItems",
      width: 100
    },
    {
      title: "Buyer Name",
      dataIndex: "BuyerName",
      width: 100
    },
    {
      title: "Account",
      dataIndex: "AccountName",
      width: 100
    },
    {
      title: "Creation Date",
      dataIndex: "CreateDate",
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
      title: "Amount Amount",
      dataIndex: "RefundAmount",
      width: 100
    },
    {
      title: "Cash Credit",
      dataIndex: "CashCredit",
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
    <div className="site-layout-content">
      <OrderManagementSearch
        meta={OrderManagementSearchFilterMeta(SectionID)}
        title="Find Order Activity"
        visible={true}
        isChecked={false}
        toggleVisiibility={() => console.log("s")}
        onApplyChanges={(newValues, count) => {
          const Params: any = newValues
          Params.SectionIDs = [SectionID]
          setSearchParams(Params)
          console.log(newValues)
        }}
        initialFilter={{}}
        isModalView
      />
      <EnrollmentLogTable
        columns={columns}
        searchFunc={searchOrders}
        expandableColumnIndices={[5]}
        responsiveColumnIndices={[1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
        searchParams={searchParams}
        rowKey="OrderID"
      />
    </div>
  )
}
