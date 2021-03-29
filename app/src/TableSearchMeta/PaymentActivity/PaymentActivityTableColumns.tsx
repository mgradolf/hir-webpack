import React from "react"
import { Link } from "react-router-dom"
import { getPaymentActivity } from "~/ApiServices/Service/ActivityService"
import { renderDateTime, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { ReadOutlined } from "@ant-design/icons"

export const getPaymentActivityTableColumns = (isModal = false, SectionID?: number): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "",
      dataIndex: "PaymentID",
      render: (text: any, record: any) => (
        <Link to={`/order/payments/${record.PaymentID}`}>
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
      title: "Payment ID",
      dataIndex: "PaymentID",
      render: (text: any, record: any) => <Link to={`/order/payments/${record.PaymentID}`}>{text}</Link>
    },
    {
      title: "Payer",
      dataIndex: "PersonName",
      render: (text: any, record: any) => {
        return <Link to={`/person/${record.PersonID}`}>{text}</Link>
      }
    }
  ]

  return { columns, searchFunc: getPaymentActivity, tableName: "PaymentActivityTableColumns" }
}
