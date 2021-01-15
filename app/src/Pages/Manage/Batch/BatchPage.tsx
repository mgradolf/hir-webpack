import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { BatchSearchMeta } from "~/FormMeta/Batch/BatchSearchMeta"
import { getBatchTableColumns } from "~/FormMeta/Batch/BatchTableColumns"

export function BatchPage() {
  return (
    <SearchPage
      title="Manage Batch"
      meta={BatchSearchMeta}
      hideSearchField={false}
      tableProps={{
        ...getBatchTableColumns()
      }}
    ></SearchPage>
  )
}
