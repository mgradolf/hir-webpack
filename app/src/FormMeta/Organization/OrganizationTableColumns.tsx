import React from "react"
import { Link } from "react-router-dom"
import { findOrganizations } from "~/ApiServices/BizApi/query/queryIf"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
import { ReadOutlined } from "@ant-design/icons"

export const getOrganizationTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      ...(!isModal && {
        title: "",
        dataIndex: "",
        render: (text: any, record: any) => (
          <Link to={`/organization/${record.OrganizationID}`}>
            <ReadOutlined />
          </Link>
        )
      })
    },
    {
      title: "Principal Contact",
      dataIndex: "PrincipalContactName",
      render: (text: any, record: any) =>
        isModal ? text : <Link to={`/person/${record.PrincipalContactPersonID}`}>{text}</Link>
    },
    {
      title: "Parent Organization",
      dataIndex: "ParentOrgName",
      render: (text: any, record: any) =>
        isModal ? text : <Link to={`/organization/${record.ParentOrganizationID}`}>{text}</Link>
    },
    { title: "Payment Gateway Account", dataIndex: "PaymentGatewayAccount" }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: findOrganizations }
}
