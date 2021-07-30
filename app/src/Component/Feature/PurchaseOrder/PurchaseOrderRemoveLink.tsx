import React from "react"
import { IconButton } from "~/Component/Common/Form/Buttons/IconButton"
import { removePurchaseOrder } from "~/ApiServices/Service/POService"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"

interface IPORemoveLinkProp {
  PurchaseOrderID: number
}

export function PurchaseOrderRemoveLink(props: IPORemoveLinkProp) {
  return (
    <IconButton
      iconType="remove"
      toolTip="Delete Purchase Order"
      onClickRemove={() => {
        return removePurchaseOrder({ PurchaseOrderID: props.PurchaseOrderID }).then((response) => {
          if (response && response.success) {
            eventBus.publish(REFRESH_PAGE)
          }
          return response
        })
      }}
    />
  )
}
