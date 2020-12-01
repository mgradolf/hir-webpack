import React from "react"
import { renderBoolean, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
import { getSectionNotifications } from "~/ApiServices/Service/SectionService"
import NoticeEditLink from "~/Component/Section/Notice/NoticeEditLink"

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
      dataIndex: "Subject"
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

  const responsiveColumnIndices = [2, 3, 4, 5]
  const expandableColumnIndices = [4]
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: getSectionNotifications }
}
