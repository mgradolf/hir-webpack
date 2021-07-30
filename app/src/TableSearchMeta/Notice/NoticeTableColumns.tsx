import React from "react"
import { renderBoolean, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { getSectionNotifications } from "~/ApiServices/Service/SectionService"
import NoticeEditLink from "~/Component/Feature/Section/Notice/NoticeEditLink"

export const getNoticeTableColumns = (SectionID: number): ITableConfigProp => {
  const columns: TableColumnType = [
    // {
    //   dataIndex: "SectionNoticeID",
    //   render: (text: any, record: any) => (
    //     <Link to={`/notice/${text}`}>
    //       <ReadOutlined />
    //     </Link>
    //   )
    // },
    {
      title: "Section Notification Type",
      dataIndex: "SectionNoticeType"
    },
    {
      title: "Subject",
      dataIndex: "Subject",
      width: "50%"
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

  return { columns, searchFunc: getSectionNotifications, tableName: "NoticeTableColumns" }
}
