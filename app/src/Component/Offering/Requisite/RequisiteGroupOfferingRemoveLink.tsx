import React from "react"
import { Button, Popconfirm } from "antd"
import { removeOfferingFromRequisiteGroup } from "~/ApiServices/BizApi/course/requisiteIf"
import { eventBus, REFRESH_OFFERING_REQUISITE_GROUP_PAGE } from "~/utils/EventBus"

interface IRequisiteOfferingRemoveLinkProp {
  offeringId: number
  requisiteGroupId?: number
}

function RequisiteOfferingRemoveLink(props: IRequisiteOfferingRemoveLinkProp) {
  const removeRequisiteGroupOffering = async () => {
    if (props.requisiteGroupId !== undefined) {
      const response = await removeOfferingFromRequisiteGroup([[props.offeringId], props.requisiteGroupId])
      if (response.success) {
        eventBus.publish(REFRESH_OFFERING_REQUISITE_GROUP_PAGE)
      }
    }
  }

  return (
    <Popconfirm
      placement="top"
      title="Are you sure, you want to delete this offering from this prerequisite group?"
      onConfirm={removeRequisiteGroupOffering}
      okText="Confirm"
      cancelText="Cancel"
    >
      <Button block type="link">
        Remove
      </Button>
    </Popconfirm>
  )
}

export default RequisiteOfferingRemoveLink
