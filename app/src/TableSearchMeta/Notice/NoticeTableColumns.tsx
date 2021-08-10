import React from "react"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { getSectionNotifications, saveSectionNotification } from "~/ApiServices/Service/SectionService"
import { Link } from "react-router-dom"
import { ReadOutlined } from "@ant-design/icons"
import { message, Switch } from "antd"
import { UPDATE_SUCCESSFULLY } from "~/utils/Constants"
import { eventBus } from "~/utils/EventBus"

export const getNoticeTableColumns = (SectionID: number): ITableConfigProp => {
  const noticeActivate = (event: any, sectionID: any, record: any) => {
    saveSectionNotification({ ...record, SectionID: sectionID, IsActive: event }).then((response) => {
      if (response.success) {
        message.success(UPDATE_SUCCESSFULLY)
        eventBus.publish("REFRESH_SECTION_NOTIFICATION_PAGE_1")
      }
    })
  }

  const columns: TableColumnType = [
    {
      dataIndex: "SectionNoticeTypeID",
      render: (text: any, record: any) => (
        <Link to={`/section/${SectionID}/notice/${text}`}>
          <ReadOutlined />
        </Link>
      )
    },
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
      render: (text: any, record: any) => (
        <Switch checked={!!text} onChange={(e) => noticeActivate(e, SectionID, record)} />
      )
    }
  ]

  return { columns, searchFunc: getSectionNotifications, tableName: "NoticeTableColumns" }
}
