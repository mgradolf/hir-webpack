import React, { useState } from "react"
import { Link, RouteComponentProps } from "react-router-dom"
import { getOrderActivity } from "~/ApiServices/Service/ActivityService"
import AcademicLogSearch from "~/Component/Common/SearchFilters"
import { ResponsiveTable, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { getSectionAcademicActivitySearchMeta } from "~/FormMeta/SectionActivity/SectionOrderActivitySearchMeta"

export default function OrderLogPage(props: RouteComponentProps<{ sectionID: string }>) {
  const SectionID = Number(props.match.params.sectionID)
  const [searchParams, setSearchParams] = useState<{ [key: string]: any }>({ SectionIDs: [SectionID] })
  const columns: TableColumnType = [
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
      render: (text: any, record: any) => <Link to={`/section/${SectionID}/order/${record.OrderID}`}>{text}</Link>
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
    <div className="site-layout-content">
      <AcademicLogSearch
        meta={getSectionAcademicActivitySearchMeta}
        title="Find Order Activity"
        visible={true}
        isCheckeble={false}
        hideFilters={() => console.log("s")}
        onApplyChanges={(newValues, count) => {
          const Params: any = newValues
          Params.SectionIDs = [SectionID]
          setSearchParams(Params)
          console.log(newValues)
        }}
        initialFilter={{}}
        isModalView
      />
      <ResponsiveTable
        columns={columns}
        searchFunc={getOrderActivity}
        expandableColumnIndices={[5]}
        responsiveColumnIndices={[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]}
        searchParams={searchParams}
        rowKey="ActivityID"
      />
    </div>
  )
}
