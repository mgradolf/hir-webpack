import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getMailMergeTableColumns } from "~/TableSearchMeta/MailMerge/MailMergeTableColumns"

export default function QueriesPage() {
  return <SearchPage title="Custom Queries" defaultFormValue={{}} tableProps={getMailMergeTableColumns()} />
}
