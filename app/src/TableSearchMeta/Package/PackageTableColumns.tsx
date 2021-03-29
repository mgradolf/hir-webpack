import React from "react"
import { Link } from "react-router-dom"
import { findPackages } from "~/ApiServices/Service/PackageService"
import { renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"

export const getPackageTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Package Name",
      dataIndex: "Name",
      render: (text: any, record: any) => <Link to={`/package/${record.PackageID}`}>{text}</Link>
    },
    {
      title: "Account",
      dataIndex: "AccountName",
      render: (text: any, record: any) => <Link to={`/account/${record.AccountID}`}>{text}</Link>
    },
    { title: "Start Date", dataIndex: "StartDate", render: renderDate },
    { title: "End Date", dataIndex: "EndDate", render: renderDate },
    { title: "Credit Units", dataIndex: "AllowedCredit", render: undefined }
  ]

  return { columns, searchFunc: findPackages, tableName: "PackageTableColumns" }
}
