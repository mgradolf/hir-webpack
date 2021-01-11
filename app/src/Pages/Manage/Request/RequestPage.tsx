import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { RequestSearchMeta } from "~/FormMeta/Request/RequestSearchMeta"
import { getRequestTableColumns } from "~/FormMeta/Request/RequestTableColumns"

export default function RequestTable() {
  return (
    <SearchPage
      title="Requests"
      meta={RequestSearchMeta}
      hideSearchField={false}
      tableProps={getRequestTableColumns()}
    ></SearchPage>
  )
}
