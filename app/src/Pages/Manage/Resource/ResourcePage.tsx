import React from "react"
import StandardPage from "~/Component/Common/Page/StandardPage"
import { getResourceTableColumns } from "~/FormMeta/Resource/ResourceTableColumns"

export default function ResourcePage() {
  return (
    <StandardPage
      title="Manage Resources"
      defaultFilter={{}}
      tableProps={{
        ...getResourceTableColumns()
      }}
    />
  )
}
