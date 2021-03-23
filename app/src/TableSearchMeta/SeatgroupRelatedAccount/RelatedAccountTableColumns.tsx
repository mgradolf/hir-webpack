import React from "react"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { findAffiliatedOrgsForSeatGroup } from "~/ApiServices/Service/SeatGroupService"
import { Link } from "react-router-dom"
import SeatGroupRelatedAccountRemoveLink from "~/Component/Feature/Section/SeatGroup/SeatGroupRelatedAccountRemoveLink"

export const getSeatgroupRelatedAccountTableColumns = (SeatGroupID: number): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Account Name",
      dataIndex: "AccountDescriptor",
      render: (text: any, record: any) => <Link to={`/account/${record.AccountID}`}>{text}</Link>
    },
    {
      title: "Invitation Code",
      dataIndex: "InvitationCode"
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text: any, record: any) => (
        <SeatGroupRelatedAccountRemoveLink AccountID={record.AccountID} SeatGroupID={SeatGroupID} />
      )
    }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return {
    columns,
    responsiveColumnIndices,
    expandableColumnIndices,
    searchFunc: () => findAffiliatedOrgsForSeatGroup({ SeatGroupID: SeatGroupID })
  }
}
