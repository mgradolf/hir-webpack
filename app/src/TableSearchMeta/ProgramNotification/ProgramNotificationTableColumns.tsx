import React from "react"
import { renderBoolean, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { getProgramEmailNotice } from "~/ApiServices/BizApi/program/programCommunicationIF"
import { ProgramNotificationEmailSetupButton } from "~/Component/Feature/ProgramNotification/ProgramNotificationEmailSetupButton"

export const getProgramNotificationTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Subject",
      dataIndex: "Subject"
    },
    {
      title: "From Email Address",
      dataIndex: "FromEmailAddress"
    },
    {
      title: "From UserID",
      dataIndex: "FromUserID"
    },
    {
      title: "Active",
      dataIndex: "IsActive",
      render: renderBoolean
    },
    {
      title: "Action",
      render: (record: any) => <ProgramNotificationEmailSetupButton EmailNotification={record} />
    }
  ]
  return { columns, searchFunc: getProgramEmailNotice, tableName: "ProgramTableColumns" }
}
