import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { getOrderDetails, searchOrders } from "~/ApiServices/Service/OrderService"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getOrderDetailsMeta } from "~/FormMeta/Order/OrderDetailsMeta"

export default function OrderDetailsPage(props: RouteComponentProps<{ orderID: string }>) {
  const OrderID = Number(props?.match?.params?.orderID)
  return (
    <DetailsPage
      getMeta={getOrderDetailsMeta}
      getDetails={async () => {
        const order1 = await getOrderDetails({ OrderID })
        const order2 = await searchOrders({ OrderID })
        order1.data = { ...order1.data[0], ...order2.data[0] }
        return order1
      }}
      entityType="Order"
      entityID={OrderID}
    />
  )
}
