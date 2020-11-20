import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { OrderSearchMeta } from "~/FormMeta/Order/OrderSearchMeta"
import { getOrderTableColumns } from "~/FormMeta/Order/OrderTableColumns"

export default function OrderLogPage() {
  return (
    <div className="site-layout-content">
      <SearchPage
        title="Find Order Activity"
        meta={OrderSearchMeta}
        hideSearchField={false}
        tableProps={getOrderTableColumns()}
      />
    </div>
  )
}
