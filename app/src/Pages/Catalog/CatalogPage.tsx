import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { CatalogSearchMeta } from "~/FormMeta/Catalog/CatalogSearchMeta"
import { getCatalogTableColumns } from "~/FormMeta/Catalog/CatalogTableColumns"

export function CatalogPage() {
  return (
    <SearchPage
      title="Catalogs"
      meta={CatalogSearchMeta}
      hideSearchField={false}
      tableProps={{
        ...getCatalogTableColumns()
      }}
    ></SearchPage>
  )
}
