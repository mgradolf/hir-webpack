import React from "react"
import { removeSeatGroup } from "~/ApiServices/Service/SeatGroupService"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"
import { Button } from "antd"

interface ISeatGroupRemoveLinkProp {
  seatgroupId: number
}
function SeatGroupRemoveLink(props: ISeatGroupRemoveLinkProp) {
  return (
    <Button
      type="link"
      onClick={async () => {
        const response = await removeSeatGroup(props.seatgroupId)
        if (response.success) {
          eventBus.publish(REFRESH_PAGE)
        }
      }}
    >
      Remove
    </Button>
  )
}

export default SeatGroupRemoveLink
