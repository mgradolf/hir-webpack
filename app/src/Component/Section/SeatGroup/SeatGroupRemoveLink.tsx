import React from "react"
import { removeSeatGroup } from "~/ApiServices/Service/SeatGroupService"
import { eventBus, REFRESH_SECTION_SEATGROUP_PAGE } from "~/utils/EventBus"
import { Button } from "antd"

interface ISeatGroupRemoveLinkProp {
  seatgroupId: number
  PrimaryType?: boolean | false
}

export default function SeatGroupRemoveLink(props: ISeatGroupRemoveLinkProp) {
  return (
    <Button
      danger={props.PrimaryType ? true : false}
      type={props.PrimaryType ? "primary" : "link"}
      onClick={async () => {
        const response = await removeSeatGroup(props.seatgroupId)
        if (response.success) {
          eventBus.publish(REFRESH_SECTION_SEATGROUP_PAGE)
        }
      }}
    >
      Remove
    </Button>
  )
}
