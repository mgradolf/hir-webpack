import React from "react"
import { getOrderActivity } from "~/ApiServices/Service/ActivityService"
import { getSectionAcademicActivitySearchMeta } from "~/FormMeta/SectionActivity/SectionOrderActivitySearchMeta"

import { renderDateTime, TableColumnType } from "~/Component/Common/ResponsiveTable"
import SearchPage from "~/Component/Common/Page/SearchPage"
import { Link } from "react-router-dom"

export default function AcademicLogPage() {
  const columns: TableColumnType = [
    {
      title: "User ID",
      dataIndex: "ActivityModifiedByUID",
      width: 100
    },
    {
      title: "User Name",
      dataIndex: "ActivityModifiedByName",
      width: 100
    },
    {
      title: "Activity Date",
      dataIndex: "ActivityModifiedDate",
      render: renderDateTime,
      width: 100
    },
    {
      title: "Activity Type",
      dataIndex: "ActivityOperation",
      width: 100
    },
    {
      title: "Order Number",
      dataIndex: "OrderID",
      width: 100,
      render: (text: any, record: any) => <Link to={`/order/${record.OrderID}`}>{text}</Link>
    },
    {
      title: "Payer Name",
      dataIndex: "PersonName",
      render: (text: any, record: any) => {
        return <Link to={`/person/${record.PersonID}`}>{text}</Link>
      },
      width: 100
    },
    // {
    //   title: "Order Status",
    //   dataIndex: "OPCStatusCodeID",
    //   width: 100
    // },
    {
      title: "Order Date",
      dataIndex: "OrderDate",
      render: renderDateTime,
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
      render: renderDateTime,
      width: 100
    },
    {
      title: "Completed Date",
      dataIndex: "CompletedDate",
      render: renderDateTime,
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
        responsiveColumnIndices: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        pagination: { position: ["topLeft"], pageSize: 20 }
      }}
    ></SearchPage>
  )
}
