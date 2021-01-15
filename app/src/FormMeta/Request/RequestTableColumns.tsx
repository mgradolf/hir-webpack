import React from "react"
import { Link } from "react-router-dom"
import { renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
import { getLiteRequests } from "~/ApiServices/Service/RequestService"

export const getRequestTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "",
      dataIndex: "RequestID",
      key: "RequestID",
      render: (text: any, record: any) => <Link to={`/request/${record.RequestID}`}>
        <ReadOutlined />
      </Link>
    },
    {
      title: "Request Date",
      dataIndex: "CreateDate",
      key: "CreateDate",
      render: renderDate
    },
    {
      title: "Purchaser",
      dataIndex: "PurchaserPersonName",
      render: (text: any, record: any) => <Link to={`/person/${record.PurchaserPersonID}`}>{text}</Link>,
      key: "PurchaserPersonName"
    },
    {
      title: "Account",
      dataIndex: "AccountName",
      render: (text: any, record: any) => <Link to={`/account/${record.AccountID}`}>{text}</Link>,
      key: "AccountName"
    },
    {
      title: "Request Type",
      dataIndex: "RequestType",
      key: "RequestType"
    },
    {
      title: "Request Status",
      dataIndex: "State",
      key: "State"
    },
    {
      title: "Source",
      dataIndex: "Source",
      key: "Source"
    }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return {
    columns,
    responsiveColumnIndices,
    expandableColumnIndices,
    searchFunc: (Params: { [key: string]: any }) =>
      getLiteRequests(Params).then((x: any) => {
        if (x.success) {
          x.data = x?.data?.Requests
        }

        return x
      })
  }
}
