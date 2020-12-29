import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { OrderSearchMeta } from "~/FormMeta/Order/OrderSearchMeta"
import { getOrderTableColumns } from "~/FormMeta/Order/OrderTableColumns"

export default function OrderLogPage() {
  return <SearchPage title="Order" meta={OrderSearchMeta} hideSearchField={false} tableProps={getOrderTableColumns()} />
}
