import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { getPaymentDetailsMeta } from "~/TableSearchMeta/Payment/PaymentDetailsMeta"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { searchPaymentDetailsByPaymentID } from "~/ApiServices/BizApi/query/queryIf"
import { searchPayments } from "~/ApiServices/BizApi/payment/paymentIF"

export default function PaymentDetailsPage(props: RouteComponentProps<{ paymentID?: string }>) {
  const PaymentID = Number(props?.match?.params?.paymentID)
  return (
    <DetailsPage
      getMeta={getPaymentDetailsMeta}
      getDetails={() =>
        Promise.all([searchPaymentDetailsByPaymentID({ PaymentID }), searchPayments({ PaymentID: PaymentID })]).then(
          (x) => {
            if (x[0].success) {
              x[0].data = { ...x[0].data[0], ...x[1].data[0] }
            }
            console.log("payment details ", x[0])
            return x[0]
          }
        )
      }
    />
  )
}
