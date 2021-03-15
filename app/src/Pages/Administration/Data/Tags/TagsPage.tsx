import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { TagsSearchMeta } from "~/TableSearchMeta/Tags/TagsSearchMeta"
import { getTagsTableColumns } from "~/TableSearchMeta/Tags/TagsTableColumns"

export default function TagsPage() {
  return (
    <SearchPage
      title="Manage Tags"
      meta={TagsSearchMeta}
      metaName="TagsSearchMeta"
      hideSearchField={false}
      tableProps={{
        ...getTagsTableColumns(true, "")
      }}
    ></SearchPage>
  )
}
