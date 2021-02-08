import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getMailMergeTableColumns } from "~/FormMeta/MailMerge/MailMergeTableColumns"

export default function MailMergePage() {
  return <SearchPage title="Mail Merge" defaultFormValue={{}} tableProps={getMailMergeTableColumns()} />
}
