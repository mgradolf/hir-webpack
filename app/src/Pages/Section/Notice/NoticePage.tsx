import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { getNoticeTableColumns } from "~/FormMeta/Notice/NoticeTableColumns"
import StandardPage from "~/Component/Common/Page/StandardPage"

export default function NoticePage(props: RouteComponentProps<{ sectionID?: string }>) {
  const SectionID = Number(props.match.params.sectionID)

  return (
    <StandardPage
      title="Manage Email Notification"
      tableProps={{ ...getNoticeTableColumns(SectionID) }}
      initialFilter={{ SectionID: SectionID }}
    />
  )
}
