import React from "react"
import { Button, Popconfirm } from "antd"
import { removeOfferingRequisiteGroup } from "~/ApiServices/BizApi/course/requisiteIf"
import { eventBus, REFRESH_OFFERING_REQUISITE_GROUP_PAGE } from "~/utils/EventBus"
import { DeleteOutlined } from "@ant-design/icons"

interface IRequisiteRemoveLinkProp {
  offeringId: number
  requisiteGroupId?: number
}

function RequisiteRemoveLink(props: IRequisiteRemoveLinkProp) {
  const removeRequisiteGroup = async () => {
    if (props.requisiteGroupId !== undefined) {
      const response = await removeOfferingRequisiteGroup({ RequisiteGroupId: props.requisiteGroupId })
      if (response.success) {
        eventBus.publish(REFRESH_OFFERING_REQUISITE_GROUP_PAGE)
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
      <Button icon={<DeleteOutlined />} shape="circle" danger type="primary" />
    </Popconfirm>
  )
}

export default RequisiteRemoveLink
