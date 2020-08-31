import React from "react"
import { Button } from "antd"
import { removeOfferingRequisiteGroupById } from "~/ApiServices/Service/EntityService"
import EventBus from "~/utils/EventBus"
import { REFRESH_OFFERING_REQUISITE_GROUP_PAGE } from "~/utils/EventList"

interface IRequisiteRemoveLinkProp {
  offeringId: number
  requisiteGroupId?: number
}
function RequisiteRemoveLink(props: IRequisiteRemoveLinkProp) {
  return (
    <Button
      style={{ marginRight: "5px" }}
      type="primary"
      onClick={async () => {
        if (props.requisiteGroupId !== undefined) {
          console.log("Requsite group id: " + props.requisiteGroupId)
          const response = await removeOfferingRequisiteGroupById(props.requisiteGroupId)
          if (response.success) {
            EventBus.publish(REFRESH_OFFERING_REQUISITE_GROUP_PAGE)
          }
        }
      }}
    >
      Remove
    </Button>
  )
}

export default RequisiteRemoveLink
