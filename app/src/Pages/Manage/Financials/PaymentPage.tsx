import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getPaymentTableColumns } from "~/FormMeta/Payment/PaymentTableColumns"
import { PaymentSearchMeta } from "~/FormMeta/Payment/PaymentSearchMeta"

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
