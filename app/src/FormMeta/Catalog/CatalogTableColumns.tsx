import React from "react"
import { Link } from "react-router-dom"
import { searchCatalog } from "~/ApiServices/BizApi/catalog/catalogIf"
import { renderBoolean, renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getCatalogTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Catalog Name",
      dataIndex: "Name",
      render: (text: any, record: any) => <Link to={`/catalog/${record.catalogID}`}>{text}</Link>
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
      title: "Description",
      dataIndex: "Description"
    }
  ]
  return { columns, searchFunc: searchCatalog, responsiveColumnIndices: [], expandableColumnIndices: [5] }
}
