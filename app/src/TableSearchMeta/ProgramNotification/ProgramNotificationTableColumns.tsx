import React from "react"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { getProgramEmailNotice } from "~/ApiServices/BizApi/program/programCommunicationIF"
import { Link } from "react-router-dom"
import { ReadOutlined } from "@ant-design/icons"
import { message, Switch } from "antd"
import { saveOrUpdateEmailNotification } from "~/ApiServices/Service/ProgramService"
import { UPDATE_SUCCESSFULLY } from "~/utils/Constants"
import { eventBus } from "~/utils/EventBus"

export const getProgramNotificationTableColumns = (isModal = false): ITableConfigProp => {
  const noticeActivate = (event: any, record: any) => {
    saveOrUpdateEmailNotification({
      ...record,
      IsActive: event
    }).then((response) => {
      if (response.success) {
        message.success(UPDATE_SUCCESSFULLY)
        eventBus.publish("REFRESH_NOTIFICATION_PROGRAM")
      }
    })
  }

  const columns: TableColumnType = [
    {
      dataIndex: "ProgramEmailNoticeID",
      render: (text: any, record: any) =>
        text === null ? (
          <></>
        ) : (
          <Link to={`/program/${record.ProgramID}/notice/${text}`}>
            <ReadOutlined />
          </Link>
        )
    },
    {
      title: "Subject",
      dataIndex: "Subject"
    },
    {
      title: "Active",
      dataIndex: "IsActive",
      render: (text: any, record: any) => <Switch checked={!!text} onChange={(e) => noticeActivate(e, record)} />
    }
  ]
  return { columns, searchFunc: getProgramEmailNotice, tableName: "ProgramTableColumns" }
}
