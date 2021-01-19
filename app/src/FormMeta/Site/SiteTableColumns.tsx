import React from "react"
import { Link } from "react-router-dom"
//TODO: fix API
import { findSites } from "~/ApiServices/BizApi/account/accountIF"
import { renderEmail, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getSiteTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Site Code",
      dataIndex: "SiteCode",
      render: (text: any, record: any) => (isModal ? text : <Link to={`/site/${record.SiteID}`}>{text}</Link>)
    },
    { title: "Site Name", dataIndex: "Name" },
    { title: "Parent Organization", dataIndex: "OrganizationName" 
      render: (text: any, record: any) => (isModal ? text : <Link to={`/organization/${record.OrganizationID}`}>{text}</Link>)
    }
  ]
  //TODO: add tab for Buildings
  return { columns, searchFunc: findSites, responsiveColumnIndices: [], expandableColumnIndices: [] }
}
