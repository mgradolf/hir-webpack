import React from "react"
import { Button, Popconfirm } from "antd"
import { removeOfferingRequisiteGroup } from "~/ApiServices/BizApi/course/requisiteIf"
import EventBus from "~/utils/EventBus"
import { REFRESH_OFFERING_REQUISITE_GROUP_PAGE } from "~/utils/EventList"

interface IRequisiteRemoveLinkProp {
  offeringId: number
  requisiteGroupId?: number
}

function RequisiteRemoveLink(props: IRequisiteRemoveLinkProp) {
  const removeRequisiteGroup = async () => {
    if (props.requisiteGroupId !== undefined) {
      const response = await removeOfferingRequisiteGroup([props.requisiteGroupId])
      if (response.success) {
        EventBus.publish(REFRESH_OFFERING_REQUISITE_GROUP_PAGE)
      }
    }
  }

  return (
    <Popconfirm
      placement="left"
      title="Are you sure, you want to delete this prerequisite group?"
      onConfirm={removeRequisiteGroup}
      okText="Confirm"
      cancelText="Cancel"
    >
      <Button style={{ marginRight: "5px" }} type="primary">
        Remove
      </Button>
    </Popconfirm>
  )
}

export default RequisiteRemoveLink
