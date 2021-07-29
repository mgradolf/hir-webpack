import React from "react"
import { Button, Tooltip } from "antd"
import { deleteOfferingFromGroup } from "~/ApiServices/BizApi/course/requisiteIf"
import { eventBus } from "~/utils/EventBus"
import { showDeleteConfirm } from "~/Component/Common/Modal/Confirmation"
import { DeleteOutlined } from "@ant-design/icons"

interface IRequisiteOfferingRemoveLinkProp {
  offeringId: number
  requisiteGroupId?: number
}

export function RequisiteOfferingRemoveLink(props: IRequisiteOfferingRemoveLinkProp) {
  return (
    <Tooltip title="Remove">
      <Button
        danger
        type="primary"
        icon={<DeleteOutlined />}
        shape="circle"
        onClick={() =>
          showDeleteConfirm(() => {
            return deleteOfferingFromGroup({
              OfferingID: props.offeringId,
              RequisiteGroupId: props.requisiteGroupId
            }).then((x) => {
              if (x && x.success) {
                eventBus.publish("REFRESH_OFFERING_REQUISITE_TABLE")
              }
              return x
            })
          })
        }
      />
    </Tooltip>
  )
}
