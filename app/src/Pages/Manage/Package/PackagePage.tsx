import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { PackageSearchMeta } from "~/FormMeta/Package/PackageSearchMeta"
import { getPackageTableColumns } from "~/FormMeta/Package/PackageTableColumns"

export default function PackagePage() {
  return (
    <SearchPage
      title="Manage Packages"
      meta={PackageSearchMeta}
      hideSearchField={false}
      tableProps={{
        ...getPackageTableColumns()
      }}
    />
  )
}
