import { Switch } from "antd"
import React from "react"
import { Link } from "react-router-dom"
import { findCatalog } from "~/ApiServices/BizApi/catalog/catalogIf"
import { addProgramToCatalog, removeProgramFromCatalog } from "~/ApiServices/Service/CatalogService"
import { renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { eventBus, REFRESH_PROGRAM_CATALOG_PAGE } from "~/utils/EventBus"

export const getProgramCatalogTableColumns = (ProgramID: number): ITableConfigProp => {
  const catalogPublished = (event: any, catalogID: any) => {
    if (event) {
      addProgramToCatalog({ ProgramID, CatalogID: catalogID }).then((response) => {
        if (response && response.success) {
          eventBus.publish(REFRESH_PROGRAM_CATALOG_PAGE)
        }
      })
    } else {
      removeProgramFromCatalog({ ProgramID, CatalogID: catalogID }).then((response) => {
        if (response && response.success) {
          eventBus.publish(REFRESH_PROGRAM_CATALOG_PAGE)
        }
      })
    }
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
    searchFunc: findCatalog
  }
}
