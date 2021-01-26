import React from "react"
import { Link } from "react-router-dom"
import { findWaitListEntries } from "~/ApiServices/BizApi/registration/waitlistIF"

import { renderDate, renderDateTime, renderEmail, TableColumnType } from "~/Component/Common/ResponsiveTable"

import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
import { ReadOutlined } from "@ant-design/icons"

export const getWaitlistEntriesTableColumns = (
  isModal = false,
  setShowCreateModal?: (record: any) => void
): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      ...(!isModal && {
        title: "",
        dataIndex: "",
        render: (text: any, record: any) => (
          <Link to={`/section/${record.SectionID}/waitlist/${record.WaitListEntryID}`}>
            <ReadOutlined />
          </Link>
        )
      })
    },
    {
      title: "Section Number",
      dataIndex: "SectionNumber",
      render: (text: any, record: any) => (isModal ? { text } : <Link to={`/section/${record.SectionID}`}>{text}</Link>)
    },
    {
      title: "Student",
      dataIndex: "StudentName",
      render: (text: any, record: any) => (isModal ? { text } : <Link to={`/student/${record.StudentID}`}>{text}</Link>)
    },
    { title: "Email", dataIndex: "StudentEmailAddress", render: renderEmail },
    { title: "Request State", dataIndex: "RequestState" },
    { title: "Priority", dataIndex: "Priority" },
    { title: "Creation Time", dataIndex: "CreationTime", render: renderDateTime },
    { title: "Expiration Date", dataIndex: "RequestExpirationTime", render: renderDate },
    { title: "Source", dataIndex: "Source" }
  ]
  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []

  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: findWaitListEntries }
}
