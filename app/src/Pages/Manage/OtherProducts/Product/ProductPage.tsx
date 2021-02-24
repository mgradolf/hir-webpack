import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import helpFileNameMap from "~/Config/HelpFileMap.json"
import { ProductSearchMeta } from "~/TableSearchMeta/Product/ProductSearchMeta"
import { getProductTableColumns } from "~/TableSearchMeta/Product/ProductTableColumns"

export default function PersonTable() {
  return (
    <SearchPage
      title="Manage Products"
      meta={ProductSearchMeta}
      hideSearchField={false}
      tableProps={{
        ...getProductTableColumns()
      }}
      helpKey={helpFileNameMap.generic}
    ></SearchPage>
  )
}
