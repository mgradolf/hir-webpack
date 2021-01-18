import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getStudentEmailTableColumns } from "~/FormMeta/StudentEmail/StudentEmailTableColumns"

export default function StudentEmailNotificationPage() {
  return (
    <SearchPage
      title="Student Email Notification"
      defaultFilter={{}}
      tableProps={{
        ...getStudentEmailTableColumns()
      }}
    ></SearchPage>
  )
}
