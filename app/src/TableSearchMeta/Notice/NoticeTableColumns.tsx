import React from "react"
import { renderBoolean, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { getSectionNotifications } from "~/ApiServices/Service/SectionService"
import NoticeEditLink from "~/Component/Feature/Section/Notice/NoticeEditLink"

export const getNoticeTableColumns = (SectionID: number): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Section Notification Type",
      dataIndex: "SectionNoticeType"
    },
    {
      title: "From Email Address",
      dataIndex: "FromEmailAddress"
    },
    {
      title: "To Email Address",
      dataIndex: "ToEmailAddress"
    },
    {
      title: "Subject",
      dataIndex: "Subject",
      width: 400
    },
    {
      title: "Active",
      dataIndex: "IsActive",
      render: renderBoolean
    },
    {
      title: "Action",
      render: (record: any) => <NoticeEditLink sectionId={SectionID} sectionNoticeTypeId={record.SectionNoticeTypeID} />
    }
  ]

  const responsiveColumnIndices: [] = []
  const expandableColumnIndices: [] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: getSectionNotifications }
}
