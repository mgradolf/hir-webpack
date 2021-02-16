import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getResourceTableColumns } from "~/TableSearchMeta/Resource/ResourceTableColumns"

export default function ResourcePage() {
  return (
    <SearchPage
      title="Manage Resources"
      defaultFormValue={{}}
      tableProps={{
        ...getResourceTableColumns()
      }}
    />
  )
}
