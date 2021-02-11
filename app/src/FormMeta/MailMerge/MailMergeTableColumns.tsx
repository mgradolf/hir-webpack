import React from "react"
import { Link } from "react-router-dom"
import { findQueryList } from "~/ApiServices/BizApi/customQuery/customQueryIf"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getMailMergeTableColumns = (): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Query Name",
      render: (text: any, record: any) => <Link to={`/mail-merge/${record.QueryName}`}>{record.QueryName}</Link>
    }
  ]
  return {
    columns,
    searchFunc: () =>
      findQueryList({}).then((x) => {
        if (x.success) {
          x.data = x.data.map((queryName: string) => ({
            QueryName: queryName
          }))
        }
        return x
      })
  }
}
