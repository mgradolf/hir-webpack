import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { searchPayments } from "~/ApiServices/BizApi/payment/paymentIF"
import { StandardDetailsPage } from "~/Component/Common/Page/DetailsPage/StandardDetailsPage"
import { getPaymentDetailsMeta } from "~/FormMeta/Payment/PaymentDetailsMeta"

export default function PaymentDetailsPage(props: RouteComponentProps<{ paymentID?: string }>) {
  const PaymentID = Number(props?.match?.params?.paymentID)
  return (
    <StandardDetailsPage
      getDetailsMeta={getPaymentDetailsMeta}
      getDetailsFunc={() => {
        return searchPayments({ PaymentID }).then((x) => {
          if (x.success) {
            x.data = x.data[0]
          }
          console.log(x)
          return x
        })
      }}
    />
  )
}
