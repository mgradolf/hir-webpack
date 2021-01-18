import React from "react"
import { renderBoolean, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
//TODO: Update the API end point 
import { findPaymentGatewayActivities } from "~/ApiServices/Service/FinancialService"
import { Link } from "react-router-dom"

export const getActivityPaymentGatewayTableColumns = (): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "",
      dataIndex: "PaymentGatewayActivityID",
      render: (text: any, record: any) => (
        <Link to={`/paymentgatewayactivity/${record.PaymentGatewayActivityID}`}>
          <ReadOutlined />
        </Link>
      )
    },  
    {
      title: "Activity Time",
      dataIndex: "RequestDate",
      render: renderDateTime,
      width: 100
    },
    {
      title: "Purcahser",
      dataIndex: "PersonName",
      render: (text: any, record: any) => <Link to={`/person/${record.PersonID}`}>{text}</Link>
    },
    {
      title: "Activity State",
      dataIndex: "ActivityState"
    },
    {
      title: "Request ID",
      dataIndex: "IsActive",
      render: (text: any, record: any) => <Link to={`/request/${record.RequestID}`}>{text}</Link>
    },
    {
      title: "Request State",
      dataIndex: "RequestState"
    },
    {
      title: "Transaction Number",
      dataIndex: "TransactionNo"
    }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: findPaymentGatewayActivities }
}
