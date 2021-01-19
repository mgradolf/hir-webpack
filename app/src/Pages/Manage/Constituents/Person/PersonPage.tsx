import React from "react"
import { PersonSearchMeta } from "~/FormMeta/Person/PersonSearchMeta"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getPersonTableColumns } from "~/FormMeta/Person/PersonTableColumns"

export default function PersonTable() {
  return (
    <SearchPage
      title="Manage Persons"
      meta={PersonSearchMeta}
      hideSearchField={false}
      tableProps={{
        ...getPersonTableColumns()
      }}
      helpKey="https://docs.google.com/document/d/1FKV-i5gsVClhsHLYFMqpdEGDVZmwJU576AXKKcTfwiY/edit?usp=sharing"
    ></SearchPage>
  )
}
