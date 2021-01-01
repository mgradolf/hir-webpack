import React from "react"
import { Link } from "react-router-dom"
import { searchCatalogs } from "~/ApiServices/Service/CatalogService"
import { renderBoolean, renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getCatalogTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Name",
      dataIndex: "Name",
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
      title: "Active",
      dataIndex: "IsActive",
      render: renderBoolean
    },
    {
      title: "Type",
      dataIndex: "CatalogTypeName"
    },
    {
      title: "Image",
      dataIndex: "CatalogImage"
    },
    {
      title: "Sort Type",
      dataIndex: "SortTypeName"
    }
  ]
  return { columns, searchFunc: searchCatalogs, responsiveColumnIndices: [], expandableColumnIndices: [] }
}
