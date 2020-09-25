import React from "react"
import { Button } from "antd"

interface IScheduleRemoveLinkProp {
  scheduleId: number
}
function ScheduleRemoveLink(props: IScheduleRemoveLinkProp) {
  return (
    <Button
      type="link"
      onClick={async () => {
        // const response = await removeSeatGroup(props.scheduleId)
        // if (response.success) {
        //   eventBus.publish(REFRESH_SECTION_SEATGROUP_PAGE)
        // }
      }}
    >
      Remove
    </Button>
  )
}

export default ScheduleRemoveLink
