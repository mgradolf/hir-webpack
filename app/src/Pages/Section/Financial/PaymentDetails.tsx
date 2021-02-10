import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { searchPayments } from "~/ApiServices/BizApi/payment/paymentIF"
import { getPaymentDetailsMeta } from "~/FormMeta/Payment/PaymentDetailsMeta"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"

export default function PaymentDetailsPage(props: RouteComponentProps<{ paymentID?: string }>) {
  const PaymentID = Number(props?.match?.params?.paymentID)
  return (
    <DetailsPage
      getMeta={getPaymentDetailsMeta}
      getDetails={() =>
        searchPayments({ PaymentID: PaymentID }).then((x) => {
          if (x.success) {
            x.data = x.data[0]
          }
          console.log(x)
          return x
        })
      }
    />
  )
}
