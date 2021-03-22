import React from "react"
import { removeAccount } from "~/ApiServices/Service/SeatGroupService"
import { eventBus, REFRESH_SEATGROUP_RELATED_ACCOUNT_PAGE } from "~/utils/EventBus"
import { Button } from "antd"

interface IRelatedAccountRemoveLinkProp {
  AccountID: number
  SeatGroupID: number
}

export default function SeatGroupRelatedAccountRemoveLink(props: IRelatedAccountRemoveLinkProp) {
  return (
    <Button
      danger
      type="primary"
      onClick={async () => {
        const response = await removeAccount({ AccountID: props.AccountID, SeatGroupID: props.SeatGroupID })
        if (response.success) {
          eventBus.publish(REFRESH_SEATGROUP_RELATED_ACCOUNT_PAGE)
        }
      }}
    >
      Remove
    </Button>
  )
}
