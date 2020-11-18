import React from "react"
import PersonSearchFilterMeta from "~/FormMeta/Person/PersonSearchFilterMeta"
import SearchPage from "~/Component/Common/Page/SearchPage"
import { getPersonTableColumns } from "~/FormMeta/Person/PersonTableColumns"

export default function PersonTable() {
  return (
    <SearchPage
      title="Manage Persons"
      meta={PersonSearchFilterMeta}
      hideSearchField={false}
      tableProps={{
        ...getPersonTableColumns()
      }}
      helpKey="https://docs.google.com/document/d/1FKV-i5gsVClhsHLYFMqpdEGDVZmwJU576AXKKcTfwiY/edit?usp=sharing"
    ></SearchPage>
  )
}
