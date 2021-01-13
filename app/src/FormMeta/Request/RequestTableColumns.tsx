import React from "react"
import { Link } from "react-router-dom"
import { renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
import { getLiteRequests } from "~/ApiServices/Service/RequestService"

export const getRequestTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Request ID",
      dataIndex: "RequestID",
      key: "RequestID",
      render: (text: any, record: any) => <Link to={`/request/${record.RequestID}`}>{text}</Link>
    },
    {
      title: "Purchaser",
      dataIndex: "PurchaserPersonName",
      render: (text: any, record: any) => <Link to={`/person/${record.PurchaserPersonID}`}>{text}</Link>,
      key: "PurchaserPersonName"
    },
    {
      title: "Creation Time",
      dataIndex: "CreateDate",
      key: "CreateDate",
      render: renderDate
    },
    {
      title: "RequestType",
      dataIndex: "RequestType",
      key: "RequestType"
    },
    {
      title: "Request Status",
      dataIndex: "State",
      key: "State"
    },
    {
      title: "Expiration",
      dataIndex: "ExpirationDate",
      key: "ExpirationDate",
      render: renderDate
    },
    {
      title: "Source",
      dataIndex: "Source",
      key: "Source"
    },
    {
      title: "Account",
      dataIndex: "AccountName",
      render: (text: any, record: any) => <Link to={`/account/${record.AccountID}`}>{text}</Link>,
      key: "AccountName"
    },
    {
      title: "Staff",
      dataIndex: "RequesterStaffUserName",
      key: "RequesterStaffUserName"
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
