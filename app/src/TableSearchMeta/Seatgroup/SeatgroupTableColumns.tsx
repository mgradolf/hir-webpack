import React from "react"
import { Link } from "react-router-dom"
import { renderBoolean, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { findSeatGroups } from "~/ApiServices/Service/SeatGroupService"
import SeatGroupMenu from "~/Component/Feature/Section/SeatGroup/SeatGroupMenu"

export const getSeatgroupTableColumns = (isModal = false, isPackagePage?: boolean): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Name",
      dataIndex: "Name",
      render: (text: any, record: any) =>
        isModal ? { text } : <Link to={`/seatgroup/${record.SeatGroupID}`}>{text}</Link>
    },
    { title: "Retail", dataIndex: "IsDefault", render: renderBoolean },
    { title: "Number Of Seats", dataIndex: "NumberOfSeats" },
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
    { ...(isPackagePage && { title: "Invitation Code", dataIndex: "InvitationCode" }) },
    {
      title: "Action",
      key: "action",
      render: (record: any) => <SeatGroupMenu additionalData={record} />
    }
  ]

  return { columns, searchFunc: findSeatGroups, tableName: "SeatgroupTableColumns" }
}
