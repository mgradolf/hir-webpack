import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { RequestSearchMeta } from "~/TableSearchMeta/Request/RequestSearchMeta"
import { getRequestTableColumns } from "~/TableSearchMeta/Request/RequestTableColumns"

export default function RequestTable() {
  return (
    <SearchPage
      title="Manage Requests"
      meta={RequestSearchMeta}
      metaName="RequestSearchMeta"
      hideSearchField={false}
      tableProps={getRequestTableColumns()}
    ></SearchPage>
  )
}
