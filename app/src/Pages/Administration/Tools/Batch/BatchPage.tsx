import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { BatchSearchMeta } from "~/TableSearchMeta/Batch/BatchSearchMeta"
import { getBatchTableColumns } from "~/TableSearchMeta/Batch/BatchTableColumns"

export default function () {
  return (
    <SearchPage
      title="Manage Batch"
      helpKey="toolsBatchSearch"
      meta={BatchSearchMeta}
      metaName="BatchSearchMeta"
      hideSearchField={false}
      tableProps={{
        ...getBatchTableColumns()
      }}
    ></SearchPage>
  )
}
