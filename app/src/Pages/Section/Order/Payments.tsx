import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getPaymentTableColumns } from "~/FormMeta/Payment/PaymentTableColumns"
import { PaymentSearchMeta } from "~/FormMeta/Payment/PaymentSearchMeta"

export default function Payments(props: RouteComponentProps<{ sectionID: string }>) {
  const SectionID = Number(props.match.params.sectionID)
  return (
    <SearchPage
      title="Payments"
      meta={PaymentSearchMeta}
      hideSearchField={true}
      defaultFilter={{ SectionID }}
      tableProps={getPaymentTableColumns(false)}
    ></SearchPage>
  )
}
