import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { OrderCreditsSearchMeta } from "~/FormMeta/OrderCredits/OrderCreditsSearchMeta"
import { getOrderCreditsTableColumns } from "~/FormMeta/OrderCredits/OrderCreditsTableColumns"

export default function OrderCreditsPage() {
  return (
    <SearchPage
      title="Order"
      meta={OrderCreditsSearchMeta}
      hideSearchField={false}
      tableProps={getOrderCreditsTableColumns()}
    />
  )
}
