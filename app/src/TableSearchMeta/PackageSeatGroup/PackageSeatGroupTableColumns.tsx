import React from "react"
import { Link } from "react-router-dom"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { findSeatGroups } from "~/ApiServices/Service/SeatGroupService"
import PackageSeatGroupMenu from "~/Component/Feature/Package/PackageSeatGroupMenu"

export const getPackageSeatGroupTableColumns = (isModal = false, AccountID?: number): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Section Number",
      dataIndex: "SectionNumber",
      render: (text: any, record: any) => (isModal ? { text } : <Link to={`/section/${record.SectionID}`}>{text}</Link>)
    },
    {
      title: "Offering Name",
      dataIndex: "OfferingName",
      render: (text: any, record: any) =>
        isModal ? { text } : <Link to={`/offering/${record.OfferingID}`}>{text}</Link>
    },
    { title: "Invitation Code", dataIndex: "InvitationCode" },
    { title: "Allocated Seats", dataIndex: "NumberOfSeats" },
    { title: "Cost Units", dataIndex: "Opportunity" },
    {
      title: "Action",
      key: "action",
      render: (record: any) => <PackageSeatGroupMenu initialData={{ ...record, AccountID: AccountID }} />
    }
  ]

  return { columns, searchFunc: findSeatGroups, tableName: "PackageSeatGroupTableColumns" }
}
