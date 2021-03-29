import React from "react"
import { Link } from "react-router-dom"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigPropWithDataSource } from "~/TableSearchMeta/ITableConfigProp"

export const getRequirementGroupDetailsTableColumns = (programEnrollment: any): ITableConfigPropWithDataSource => {
  const columns: TableColumnType = [
    {
      title: "Requirement Group",
      dataIndex: "RequirementGroupName"
    },
    {
      title: "Offering Code",
      dataIndex: "OfferingCode",
      render: (text: any, record: any) => <Link to={`/offering/${record.OfferingID}`}>{text}</Link>
    },
    {
      title: "Offering Name",
      dataIndex: "OfferingName",
      render: (text: any, record: any) => <Link to={`/offering/${record.OfferingID}`}>{text}</Link>
    },
    { title: "Status", dataIndex: "Status" }
  ]

  return { columns, dataSource: programEnrollment.Offerings, tableName: "RequirementGroupDetailsTableColumns" }
}
