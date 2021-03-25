import { Switch } from "antd"
import React from "react"
import { Link } from "react-router-dom"
import { findCatalog } from "~/ApiServices/BizApi/catalog/catalogIf"
import { renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { addOrRemoveOfferingToCatalog } from "~/ApiServices/Service/OfferingService"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { eventBus, REFRESH_OFFERING_CATALOG_PAGE } from "~/utils/EventBus"

export const getOfferingCatalogTableColumns = (OfferingID: number): ITableConfigProp => {
  const catalogPublished = (event: any, catalogID: any) => {
    findCatalog({ OfferingID })
      .then((response) => {
        const publishedRowData = []
        if (response && response.success) {
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].isPublished) {
              publishedRowData.push(response.data[i].catalogID)
            }
          }
        }
        return publishedRowData
      })
      .then((result) => {
        if (event) {
          result.push(catalogID)
        } else {
          const index = result.indexOf(catalogID)
          result.splice(index, 1)
        }

        addOrRemoveOfferingToCatalog({ OfferingID, CatalogIDs: result }).then((response) => {
          if (response && response.success) {
            eventBus.publish(REFRESH_OFFERING_CATALOG_PAGE)
          }
        })
      })
  }

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
      render: (text: any, record: any) => (
        <Switch checked={!!text} onChange={(e) => catalogPublished(e, record.catalogID)} />
      )
    }
  ]
  return {
    columns,
    searchFunc: () => findCatalog({ OfferingID }),
    tableName: "OfferingCatalogTableColumns"
  }
}
