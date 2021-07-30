import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getStudentEmailTableColumns } from "~/TableSearchMeta/StudentEmail/StudentEmailTableColumns"

export default function StudentEmailNotificationPage() {
  return (
    <SearchPage
      title="Student Email Notification"
      helpKey="administrationToolsStudentEmailNotification"
      defaultFormValue={{}}
      tableProps={{
        ...getStudentEmailTableColumns()
      }}
    ></SearchPage>
  )
}
