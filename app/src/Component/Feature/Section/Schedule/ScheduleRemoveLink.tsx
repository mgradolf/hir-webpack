import React from "react"
import { Button } from "antd"
import { removeMeetings } from "~/ApiServices/Service/SectionService"
import { eventBus, REFRESH_SECTION_SCHEDULE_PAGE } from "~/utils/EventBus"

interface IScheduleRemoveLinkProp {
  scheduleId: number
}
function ScheduleRemoveLink(props: IScheduleRemoveLinkProp) {
  return (
    <Button
      type="link"
      onClick={async () => {
        const response = await removeMeetings({ ScheduleIDs: [props.scheduleId] })
        if (response.success) {
          eventBus.publish(REFRESH_SECTION_SCHEDULE_PAGE)
        }
      }}
    >
      Remove
    </Button>
  )
}

export default ScheduleRemoveLink
