import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getPaymentTableColumns } from "~/TableSearchMeta/Payment/PaymentTableColumns"
import { PaymentSearchMeta } from "~/TableSearchMeta/Payment/PaymentSearchMeta"

export default function Payments() {
  return (
    <SearchPage
      title="Manage Payments"
      meta={PaymentSearchMeta}
      hideSearchField={false}
      tableProps={getPaymentTableColumns(false)}
    ></SearchPage>
  )
}
