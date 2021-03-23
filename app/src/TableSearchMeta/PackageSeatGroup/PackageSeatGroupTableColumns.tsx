import React from "react"
import { Link } from "react-router-dom"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { findSeatGroups } from "~/ApiServices/Service/SeatGroupService"
import { Button, Dropdown } from "antd"
import { DownOutlined } from "@ant-design/icons"
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
      render: (record: any) => (
        <Dropdown
          overlay={<PackageSeatGroupMenu initialData={{ ...record, AccountID: AccountID }} />}
          trigger={["click"]}
        >
          <Button type="primary" onClick={(e) => e.preventDefault()}>
            Go To <DownOutlined />
          </Button>
        </Dropdown>
      )
    }
  ]

  const responsiveColumnIndices: [] = []
  const expandableColumnIndices: [] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: findSeatGroups }
}
