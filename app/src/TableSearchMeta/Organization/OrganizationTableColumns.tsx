import React from "react"
import { Link } from "react-router-dom"
import { findOrganizations } from "~/ApiServices/BizApi/query/queryIf"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"

export const getOrganizationTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Name",
      dataIndex: "Name",
      render: (text: any, record: any) =>
        isModal ? text : <Link to={`/data/organization/${record.OrganizationID}`}>{text}</Link>
    },
    {
      title: "Short Name",
      dataIndex: "ShortName"
    },
    {
      title: "Organization Type",
      dataIndex: "OrganizationType"
    },
    {
      title: "Parent Organization",
      dataIndex: "ParentOrgName",
      render: (text: any, record: any) =>
        isModal ? text : <Link to={`/data/organization/${record.ParentOrganizationId}`}>{text}</Link>
    }
  ]

  return { columns, searchFunc: findOrganizations, tableName: "OrganizationTableColumns" }
}
