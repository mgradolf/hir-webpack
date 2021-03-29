import React from "react"
import { Link } from "react-router-dom"
import { searchOffering } from "~/ApiServices/Service/OfferingService"
import { renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"

export const getOfferingTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Offering Code",
      dataIndex: "OfferingCode",
      render: (text: any, record: any) => (isModal ? text : <Link to={`/offering/${record.OfferingID}`}>{text}</Link>),
      sorter: (a: any, b: any) => a.OfferingCode.length - b.OfferingCode.length
    },
    {
      title: "Offering Name",
      dataIndex: "OfferingName",
      sorter: (a: any, b: any) => a.OfferingName.length - b.OfferingName.length
    },
    {
      title: "Status",
      dataIndex: "StatusCode",
      sorter: (a: any, b: any) => a.StatusCode.length - b.StatusCode.length
    },
    {
      title: "Creation Date",
      dataIndex: "CreationDate",
      render: renderDate
    },
    {
      title: "Termination Date",
      dataIndex: "TerminationDate",
      render: renderDate
    },
    {
      title: "Department",
      dataIndex: "OrganizationName"
    }
  ]

  return { columns, searchFunc: searchOffering, tableName: "OfferingTableColumns" }
}
