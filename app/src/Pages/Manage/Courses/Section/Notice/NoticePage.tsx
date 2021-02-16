import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { getNoticeTableColumns } from "~/TableSearchMeta/Notice/NoticeTableColumns"
import { SearchPage } from "~/Component/Common/Page/SearchPage"

export default function NoticePage(props: RouteComponentProps<{ sectionID?: string }>) {
  const SectionID = Number(props.match.params.sectionID)

  return (
    <SearchPage
      title="Manage Email Notification"
      tableProps={{ ...getNoticeTableColumns(SectionID) }}
      initialFormValue={{ SectionID: SectionID }}
    />
  )
}
