import React from "react"
import { renderBoolean, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { searchResourceItem } from "~/ApiServices/Service/FinancialService"
import { Link } from "react-router-dom"

export const getResourceTableColumns = (): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Name",
      dataIndex: "Name",
      render: (text: any, record: any) => <Link to={`/resource/${record.ResourceID}`}>{text}</Link>
    },
    {
      title: "Resource Type",
      dataIndex: "ResourceType"
    },
    {
      title: "Active",
      dataIndex: "IsActive",
      render: renderBoolean
    }
  ]

  return { columns, searchFunc: searchResourceItem, tableName: "ResourceTableColumns" }
}
