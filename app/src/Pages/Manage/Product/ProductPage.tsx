import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { ProductSearchMeta } from "~/FormMeta/Product/ProductSearchMeta"
import { getProductTableColumns } from "~/FormMeta/Product/ProductTableColumns"

export default function PersonTable() {
  return (
    <SearchPage
      title="Manage Products"
      meta={ProductSearchMeta}
      hideSearchField={false}
      tableProps={{
        ...getProductTableColumns()
      }}
      helpKey="https://docs.google.com/document/d/1FKV-i5gsVClhsHLYFMqpdEGDVZmwJU576AXKKcTfwiY/edit?usp=sharing"
    ></SearchPage>
  )
}
