import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getOrderItemTableColumns } from "~/TableSearchMeta/OrderItem/OrderItemsTableColumns"
import { OrderItemsFiltersMeta } from "~/TableSearchMeta/OrderItem/OrderItemsSearchMeta"

export default function AccountPage() {
  return (
    <SearchPage
      title="Manage Order Items"
      meta={OrderItemsFiltersMeta}
      metaName="OrderItemsFiltersMeta"
      hideSearchField={false}
      tableProps={{
        ...getOrderItemTableColumns()
      }}
    ></SearchPage>
  )
}
