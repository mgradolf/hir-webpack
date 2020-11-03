import React from "react"
import { getOrderActivity } from "~/ApiServices/Service/ActivityService"
import { getSectionAcademicActivitySearchMeta } from "~/FormMeta/SectionActivity/SectionOrderActivitySearchMeta"
import { ColumnsType } from "antd/lib/table"
import { RecordType } from "~/Component/Common/ResponsiveTable"
import SearchPage from "~/Component/Common/Page/SearchPage"
import { Link } from "react-router-dom"

export default function AcademicLogPage() {
  const columns: ColumnsType<RecordType> = [
    {
      title: "User ID",
      dataIndex: "PersonID",
      width: 100
    },
    {
      title: "User Name",
      dataIndex: "PersonName",
      width: 100
    },
    {
      title: "Activity Date",
      dataIndex: "ActivityModifiedDate",
      width: 100
    },
    {
      title: "Activity Type",
      dataIndex: "StudentID",
      width: 100
    },
    {
      title: "Order Number",
      dataIndex: "OrderID",
      width: 100,
      render: (text: any, record: any) => <Link to={`/order/${record.OrderID}`}>{text}</Link>
    },
    {
      title: "Paid By",
      dataIndex: "BillToAddress",
      width: 100
    },
    {
      title: "Order Status",
      dataIndex: "OPCStatusCodeID",
      width: 100
    },
    {
      title: "Order Date",
      dataIndex: "OrderDate",
      width: 100
    },
    {
      title: "Total Items",
      dataIndex: "TotalItems",
      width: 100
    },
    {
      title: "Discount Amount",
      dataIndex: "DiscountAmount",
      width: 100
    },
    {
      title: "Total Amount",
      dataIndex: "TotalAmount",
      width: 100
    },
    {
      title: "Creation Date",
      dataIndex: "CreateDate",
      width: 100
    },
    {
      title: "Completion Date",
      dataIndex: "CompletedDate",
      width: 100
    }
  ]

  return (
    <SearchPage
      title="Order Activity"
      initialFilter={{}}
      meta={getSectionAcademicActivitySearchMeta}
      hideSearchField={false}
      tableProps={{
        columns: columns,
        searchFunc: getOrderActivity,
        expandableColumnIndices: [5],
        responsiveColumnIndices: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
        pagination: { position: ["topLeft"], pageSize: 20 }
      }}
    ></SearchPage>
  )
}
