import React from "react"
import { Link } from "react-router-dom"
import { getOrderActivity } from "~/ApiServices/Service/ActivityService"
import { renderDateTime, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { ReadOutlined } from "@ant-design/icons"

export const getActivityOrderSearchTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "",
      dataIndex: "OrderID",
      render: (text: any, record: any) => (
        <Link to={`/order/${record.OrderID}`}>
          <ReadOutlined />
        </Link>
      )
    },
    {
      title: "Activity Time",
      dataIndex: "ActivityModifiedDate",
      render: renderDateTime
    },
    {
      title: "Activity Type",
      dataIndex: "ActivityOperation"
    },
    {
      title: "Activity By",
      dataIndex: "ActivityModifiedByName"
    },
    {
      title: "Order ID",
      dataIndex: "OrderID",
      render: (text: any, record: any) => <Link to={`/order/${record.OrderID}`}>{text}</Link>
    },
    {
      title: "Purchaser",
      dataIndex: "PersonName",
      render: (text: any, record: any) => {
        return <Link to={`/person/${record.PersonID}`}>{text}</Link>
      }
    }
  ]
  return { columns, searchFunc: getOrderActivity, tableName: "ActivityOrderSearchTableColumns" }
}
