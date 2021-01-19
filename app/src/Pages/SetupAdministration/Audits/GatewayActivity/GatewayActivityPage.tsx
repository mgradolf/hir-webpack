import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { ActivityPaymentGatewaySearchMeta } from "~/FormMeta/ActivityPaymentGateway/ActivityPaymentGatewaySearchMeta"
import { getActivityPaymentGatewayTableColumns } from "~/FormMeta/ActivityPaymentGateway/ActivityPaymentGatewayTableColumns"

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
