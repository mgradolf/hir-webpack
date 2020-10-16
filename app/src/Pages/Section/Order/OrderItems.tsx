import moment from "moment"
import React, { useState } from "react"
import { Link, RouteComponentProps } from "react-router-dom"
import OrderItemsSearchFilters from "~/Component/Common/SearchFilters"
import { OrderItemsFiltersMeta } from "~/Component/Section/Order/OrderItemsFilters/OrderItemsFiltersMeta"
import { getOrderItems } from "~/ApiServices/Service/OrderService"
import OrderItemsTable from "~/Component/Common/ResponsiveTable"

export default function OrderItems(props: RouteComponentProps<{ sectionID?: string }>) {
  const SectionID = Number(props.match.params.sectionID)
  const [searchParams, setSearchParams] = useState({ SectionID })
  return (
    <div className="site-layout-content">
      <OrderItemsSearchFilters
        meta={OrderItemsFiltersMeta(SectionID)}
        isChecked={false}
        isModalView={true}
        visible={true}
        title="Search Order Items"
        toggleVisiibility={() => {
          console.log("meo")
        }}
        onApplyChanges={(newValues: any, appliedFilterCount: number) => {
          newValues.SectionID = SectionID
          console.log(newValues)
          setSearchParams(newValues)
        }}
        initialFilter={{}}
      />
      <OrderItemsTable
        searchFunc={getOrderItems}
        searchParams={searchParams}
        rowKey="OrderItemID"
        columns={[
          {
            title: "Order ID",
            dataIndex: "OrderID",
            render: (text: any, record: any) => <Link to={`/section/${SectionID}/order/${record.OrderID}`}>{text}</Link>
          },
          {
            title: "Order Date",
            dataIndex: "OrderDate",
            render: (text: any) => (text !== null ? moment(text).format("YYYY-MM-DD") : "")
          },
          {
            title: "Purchaser",
            dataIndex: "PurchaserName"
          },
          {
            title: "Item",
            dataIndex: "ItemName"
          },
          {
            title: "Quantity",
            dataIndex: "Quantity"
          },
          {
            title: "Balance",
            dataIndex: "Balance"
          },
          {
            title: "Due Date",
            dataIndex: "PaymentDueDate",
            render: (text: any) => (text !== null ? moment(text).format("YYYY-MM-DD") : "")
          }
        ]}
      />
    </div>
  )
}
