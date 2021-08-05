import React from "react"
import { Button, Tooltip } from "antd"
import { removeOfferingRequisiteGroup } from "~/ApiServices/BizApi/course/requisiteIf"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"
import { DeleteOutlined } from "@ant-design/icons"
import { showDeleteConfirm } from "~/Component/Common/Modal/Confirmation"

interface IRequisiteRemoveLinkProp {
  offeringId: number
  requisiteGroupId?: number
}

export function RequisiteRemoveLink(props: IRequisiteRemoveLinkProp) {
  return (
    <Tooltip title="Remove">
      <Button
        danger
        type="primary"
        icon={<DeleteOutlined />}
        shape="circle"
        disabled={props.requisiteGroupId === undefined}
        onClick={() =>
          showDeleteConfirm(() => {
            return removeOfferingRequisiteGroup({
              RequisiteGroupId: props.requisiteGroupId
            }).then((x) => {
              if (x && x.success) {
                eventBus.publish(REFRESH_PAGE)
              }
              return x
            })
          })
        }
      />
    </Tooltip>
  )
}
