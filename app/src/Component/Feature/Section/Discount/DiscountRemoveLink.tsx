import React from "react"
import { removeSectionDiscounts } from "~/ApiServices/Service/SectionService"
import { eventBus } from "~/utils/EventBus"
import { Button } from "antd"
import { DeleteOutlined } from "@ant-design/icons"
import { showDeleteConfirm } from "~/Component/Common/Modal/Confirmation"

interface IDiscountRemoveLinkProp {
  sectionDiscountId: number
}

export default function DiscountRemoveLink(props: IDiscountRemoveLinkProp) {
  return (
    <Button
      type="primary"
      danger
      icon={<DeleteOutlined />}
      shape="circle"
      onClick={() =>
        showDeleteConfirm(() => {
          return removeSectionDiscounts({ SectionDiscountIDs: [props.sectionDiscountId] }).then((x) => {
            if (x && x.success) {
              eventBus.publish("REFRESH_SECTION_DISCOUNT_PAGE_1")
            }
            return x
          })
        })
      }
    />
  )
}
