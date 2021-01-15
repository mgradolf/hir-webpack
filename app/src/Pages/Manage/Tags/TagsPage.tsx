import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { TagsSearchMeta } from "~/FormMeta/Tags/TagsSearchMeta"
import { getTagsTableColumns } from "~/FormMeta/Tags/TagsTableColumns"

export default function TagsPage() {
  const meta: any = TagsSearchMeta.map((x: any) => {
    if (x.hidden) {
      x.hidden = false
    }
    return x
  })
  return (
    <SearchPage
      title="Manage Tags"
      meta={meta}
      hideSearchField={false}
      tableProps={{
        ...getTagsTableColumns(true)
      }}
    ></SearchPage>
  )
}
