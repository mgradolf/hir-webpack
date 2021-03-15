import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { CatalogSearchMeta } from "~/TableSearchMeta/Catalog/CatalogSearchMeta"
import { getCatalogTableColumns } from "~/TableSearchMeta/Catalog/CatalogTableColumns"

export default () => {
  return (
    <SearchPage
      title="Manage Catalogs"
      meta={CatalogSearchMeta}
      metaName="CatalogSearchMeta"
      hideSearchField={false}
      tableProps={{
        ...getCatalogTableColumns()
      }}
    ></SearchPage>
  )
}
