import React from "react"
import { Link } from "react-router-dom"
import { searchCatalogs } from "~/ApiServices/Service/CatalogService"
import { renderDate, sortByString, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"

export const getCatalogTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Name",
      dataIndex: "Name",
      render: (text: any, record: any) => (isModal ? text : <Link to={`/catalog/${record.CatalogID}`}>{text}</Link>),
      sorter: (a, b) => sortByString(a.Name, b.Name)
    },
    {
      title: "Start Date",
      dataIndex: "StartDate",
      render: renderDate
    },
    {
      title: "End Date",
      dataIndex: "EndDate",
      render: renderDate
    },
    {
      title: "Status",
      dataIndex: "Status"
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
      dataIndex: "SortTypeName",
      sorter: (a, b) => sortByString(a.SortTypeName, b.SortTypeName)
    }
  ]
  return { columns, searchFunc: searchCatalogs, responsiveColumnIndices: [], expandableColumnIndices: [] }
}
