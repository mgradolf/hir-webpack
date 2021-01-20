import React from "react"
import { Link } from "react-router-dom"
//TODO: fix API
import { findBuildings } from "~/ApiServices/BizApi/account/accountIF"
import { renderEmail, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getBuildingTypeTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Building Number",
      dataIndex: "BuildingNumber",
      render: (text: any, record: any) => (isModal ? text : <Link to={`/building/${record.BuildingID}`}>{text}</Link>)
    },
    { title: "Building Name", dataIndex: "Name" },
    { title: "Site", dataIndex: "SiteName" ,
      render: (text: any, record: any) => (isModal ? text : <Link to={`/site/${record.SiteID}`}>{text}</Link>)
    }
  ]
  return { columns, searchFunc: findBuildings, responsiveColumnIndices: [], expandableColumnIndices: [] }
}
