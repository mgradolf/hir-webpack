import React from "react"
import { Link } from "react-router-dom"
import { findCatalog } from "~/ApiServices/BizApi/catalog/catalogIf"
import { renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getCatalogTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Catalog Name",
      dataIndex: "catalogName",
      render: (text: any, record: any) => <Link to={`/catalog/${record.catalogID}`}>{record.catalogName}</Link>,
      key: "catalogName"
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: renderDate
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: renderDate
    },
    {
      title: "Current Status",
      dataIndex: "currentStatus",
      key: "currentStatus"
    }
  ]
  return { columns, searchFunc: findCatalog, responsiveColumnIndices: [], expandableColumnIndices: [] }
}
