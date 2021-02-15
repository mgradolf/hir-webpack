import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { ActivityPaymentGatewaySearchMeta } from "~/TableSearchMeta/ActivityPaymentGateway/ActivityPaymentGatewaySearchMeta"
import { getActivityPaymentGatewayTableColumns } from "~/TableSearchMeta/ActivityPaymentGateway/ActivityPaymentGatewayTableColumns"

export default function GatewayActivityPage() {
  return (
    <SearchPage
      title="Gateway Activity"
      meta={ActivityPaymentGatewaySearchMeta}
      hideSearchField={false}
      tableProps={{
        ...getActivityPaymentGatewayTableColumns()
      }}
    ></SearchPage>
  )
}
