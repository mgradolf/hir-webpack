import React, { useState } from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getPaymentTableColumns } from "~/TableSearchMeta/Payment/PaymentTableColumns"
import { PaymentSearchMeta } from "~/TableSearchMeta/Payment/PaymentSearchMeta"
import { IconButton } from "~/Component/Common/Form/Buttons/IconButton"
import { Redirect } from "react-router"

export default function Payments() {
  const [redirectToPaymentPage, setRedirectToPaymentPage] = useState<string>()
  return (
    <>
      {redirectToPaymentPage && <Redirect to={redirectToPaymentPage} />}
      <SearchPage
        title="Manage Payments"
        blocks={[
          <IconButton
            iconType="create"
            toolTip="Make Payment"
            onClick={() => {
              setRedirectToPaymentPage("/create-payment")
            }}
          />
        ]}
        meta={PaymentSearchMeta}
        metaName="PaymentSearchMeta"
        hideSearchField={false}
        tableProps={getPaymentTableColumns(false)}
      />
    </>
  )
}
