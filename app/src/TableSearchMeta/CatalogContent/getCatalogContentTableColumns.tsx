import React from "react"
import { Link } from "react-router-dom"
import { getCatalogContent } from "~/ApiServices/Service/CatalogService"
import { renderDate, sortByString, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { CatalogContentRemoveButton } from "~/TableSearchMeta/CatalogContent/CatalogContentRemoveButton"

export const getCatalogContentTableColumns = (isModal = false, eventName: string): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Type",
      dataIndex: "contentType",
      sorter: (a: any, b: any) => sortByString(a.contentType, b.contentType)
    },
    {
      title: "Code/ Number",
      dataIndex: "contentCode",
      sorter: (a: any, b: any) => sortByString(a.contentCode, b.contentCode),
      render: (text, record) => (isModal ? text : <Link to={`/${record.contentType}/${record.contentID}`}>{text}</Link>)
    },
    {
      title: "Status",
      dataIndex: "contentStatus",
      sorter: (a: any, b: any) => sortByString(a.contentStatus, b.contentStatus)
    },
    { title: "Start Date", dataIndex: "startDate", render: renderDate },
    { title: "End Date", dataIndex: "endDate", render: renderDate },
    {
      ...(!isModal && {
        title: "Action",
        render: (text: any, record: any) => <CatalogContentRemoveButton catalog={record} eventName={eventName} />
      })
    }
  ]
  return { columns, searchFunc: getCatalogContent, tableName: "getCatalogContentTableColumns" }
}
