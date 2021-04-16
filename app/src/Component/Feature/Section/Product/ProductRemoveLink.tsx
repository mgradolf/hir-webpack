import React from "react"
import { deleteSectionProduct } from "~/ApiServices/BizApi/product/productIf"
import { eventBus } from "~/utils/EventBus"
import { Button } from "antd"
import { DeleteOutlined } from "@ant-design/icons"
import { showDeleteConfirm } from "~/Component/Common/Modal/Confirmation"

interface IProducutRemoveLinkProp {
  sectionId: number
  productId: number
}

export default function ProductRemoveLink(props: IProducutRemoveLinkProp) {
  return (
    <Button
      danger
      type="primary"
      icon={<DeleteOutlined />}
      shape="circle"
      onClick={() =>
        showDeleteConfirm(() => {
          return deleteSectionProduct([props.sectionId, [props.productId]]).then((x) => {
            if (x && x.success) {
              eventBus.publish("REFRESH_SECTION_PRODUCT_PAGE_1")
            }
            return x
          })
        })
      }
    />
  )
}
