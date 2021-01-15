import { Switch } from "antd"
import React from "react"
import { Link } from "react-router-dom"
import { getWebCatalogPrograms } from "~/ApiServices/BizApi/catalog/catalogIf"
import { renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getProgramCatalogTableColumns = (ProgramID: number): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Catalog Name",
      dataIndex: "catalogName",
      render: (text: any, record: any) => <Link to={`/catalog/${record.CatalogID}`}>{text}</Link>
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      render: renderDate
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      render: renderDate
    },
    {
      title: "Current Status",
      dataIndex: "currentStatus"
    },
    {
      title: "Published",
      dataIndex: "isPublished",
      render: (text: any, record: any) => <Switch checked={!!text} />
    }
  ]
  return {
    columns,
    searchFunc: () => getWebCatalogPrograms(ProgramID)
  }
}
