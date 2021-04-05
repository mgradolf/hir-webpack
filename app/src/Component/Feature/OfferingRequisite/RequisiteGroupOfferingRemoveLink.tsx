import React from "react"
import { Button } from "antd"
import { deleteOfferingFromGroup } from "~/ApiServices/BizApi/course/requisiteIf"
import { eventBus, REFRESH_ADD_OFFERING_FROM_REQUISITE_GROUP } from "~/utils/EventBus"
import { showDeleteConfirm } from "~/Component/Common/Modal/Confirmation"

interface IRequisiteOfferingRemoveLinkProp {
  offeringId: number
  requisiteGroupId?: number
}

export function RequisiteOfferingRemoveLink(props: IRequisiteOfferingRemoveLinkProp) {
  return (
    <Button
      danger
      type="primary"
      onClick={() =>
        showDeleteConfirm(() => {
          return deleteOfferingFromGroup({
            OfferingID: props.offeringId,
            RequisiteGroupId: props.requisiteGroupId
          }).then((x) => {
            if (x && x.success) {
              eventBus.publish(REFRESH_ADD_OFFERING_FROM_REQUISITE_GROUP)
            }
            return x
          })
        })
      }
    >
      Remove
    </Button>
  )
}
