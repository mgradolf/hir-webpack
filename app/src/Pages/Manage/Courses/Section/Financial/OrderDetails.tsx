import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { getOrderDetails } from "~/ApiServices/Service/OrderService"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getOrderDetailsMeta } from "~/TableSearchMeta/Order/OrderDetailsMeta"

export default function OrderDetailsPage(props: RouteComponentProps<{ orderID: string }>) {
  const OrderID = Number(props?.match?.params?.orderID)
  return (
    <DetailsPage
      getMeta={getOrderDetailsMeta}
      getDetails={() => getOrderDetails({ OrderID })}
      entityType="Order"
      entityID={OrderID}
    />
  )
}
