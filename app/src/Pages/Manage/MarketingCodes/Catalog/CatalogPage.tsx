import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { CatalogSearchMeta } from "~/FormMeta/Catalog/CatalogSearchMeta"
import { getCatalogTableColumns } from "~/FormMeta/Catalog/CatalogTableColumns"

export default () => {
  return (
    <SearchPage
      title="Manage Catalogs"
      meta={CatalogSearchMeta}
      hideSearchField={false}
      tableProps={{
        ...getCatalogTableColumns()
      }}
    ></SearchPage>
  )
}
