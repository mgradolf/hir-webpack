import React from "react"
import { removeSeatGroup } from "~/ApiServices/Service/SeatGroupService"
import { eventBus, REFRESH_SECTION_SEATGROUP_PAGE } from "~/utils/EventBus"
import { CreateEditRemoveIconButton } from "~/Component/Common/Form/Buttons/CreateEditRemoveIconButton"

interface ISeatGroupRemoveLinkProp {
  seatgroupId: number
  PrimaryType?: boolean | false
}

export default function SeatGroupRemoveLink(props: ISeatGroupRemoveLinkProp) {
  return (
    <CreateEditRemoveIconButton
      iconType="remove"
      toolTip="Remove"
      onClickRemove={() => {
        return removeSeatGroup({ SeatGroupID: props.seatgroupId }).then((response) => {
          if (response.success) {
            eventBus.publish(REFRESH_SECTION_SEATGROUP_PAGE)
          }
          return response
        })
      }}
    />
  )
}
