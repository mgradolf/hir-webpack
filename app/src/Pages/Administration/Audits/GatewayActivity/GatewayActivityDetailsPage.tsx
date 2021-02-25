import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { findPaymentGatewayActivities } from "~/ApiServices/Service/PaymentGatewayService"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getActivityPaymentGatewayDetailsMeta } from "~/TableSearchMeta/ActivityPaymentGateway/ActivityPaymentGatewayDetailsMeta"

export default function GatewayActivityDetailsPage(props: RouteComponentProps<{ PaymentGatewayActivityID: string }>) {
  const PaymentGatewayActivityID = Number(props?.match?.params?.PaymentGatewayActivityID)
  return (
    <DetailsPage
      getMeta={getActivityPaymentGatewayDetailsMeta}
      getDetails={() =>
        findPaymentGatewayActivities({ PaymentGatewayActivityID }).then((x) => {
          if (x.success) x.data = x.data[0]
          return x
        })
      }
      // entityType="Account"
      // entityID={PaymentGatewayActivityID}
    />
  )
}
