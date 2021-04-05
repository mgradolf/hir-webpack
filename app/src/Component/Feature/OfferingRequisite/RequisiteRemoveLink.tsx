import React from "react"
import { Button } from "antd"
import { removeOfferingRequisiteGroup } from "~/ApiServices/BizApi/course/requisiteIf"
import { eventBus, REFRESH_OFFERING_REQUISITE_GROUP_PAGE } from "~/utils/EventBus"
import { showDeleteConfirm } from "~/Component/Common/Modal/Confirmation"

interface IRequisiteRemoveLinkProp {
  offeringId: number
  requisiteGroupId?: number
}

export function RequisiteRemoveLink(props: IRequisiteRemoveLinkProp) {
  return (
    <Button
      danger
      type="primary"
      onClick={() =>
        showDeleteConfirm(() => {
          return removeOfferingRequisiteGroup({
            RequisiteGroupId: props.requisiteGroupId
          }).then((x) => {
            if (x && x.success) {
              eventBus.publish(REFRESH_OFFERING_REQUISITE_GROUP_PAGE)
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
