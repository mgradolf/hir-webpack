import React from "react"
import { Link } from "react-router-dom"
import { renderBoolean, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { findSeatGroups } from "~/ApiServices/Service/SeatGroupService"
import { SeatGroupMenu } from "~/Component/Feature/Section/SeatGroup/SeatGroupMenu"

export const getSeatgroupTableColumns = (
  isModal = false,
  AccountID?: number,
  SectionID?: number,
  ProgramID?: number
): ITableConfigProp => {
  const helpKey: string | undefined = AccountID
    ? "accountEditSeatGroupsForm"
    : ProgramID
    ? "programEditSeatGroupsTab"
    : undefined
  const columns: TableColumnType = [
    {
      title: "Name",
      dataIndex: "Name",
      render: (text: any, record: any) =>
        isModal ? (
          { text }
        ) : (
          <Link
            to={
              SectionID
                ? `/section/${SectionID}/seatgroup/${record.SeatGroupID}`
                : AccountID
                ? `/account/${AccountID}/seatgroup/${record.SeatGroupID}`
                : ProgramID
                ? `/program/${ProgramID}/seatgroup/${record.SeatGroupID}`
                : `/seatgroup/${record.SeatGroupID}`
            }
          >
            {text}
          </Link>
        )
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
    {
      title: "Action",
      key: "action",
      render: (record: any) => <SeatGroupMenu helpKey={helpKey} additionalData={record} />
    }
  ]

  return { columns, searchFunc: findSeatGroups, tableName: "SeatgroupTableColumns" }
}
