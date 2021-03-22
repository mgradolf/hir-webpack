import React from "react"
import { deleteSectionProduct } from "~/ApiServices/BizApi/product/productIf"
import { eventBus, REFRESH_SECTION_PRODUCT_PAGE } from "~/utils/EventBus"
import { Button } from "antd"

interface IProducutRemoveLinkProp {
  sectionId: number
  productId: number
}
function ProductRemoveLink(props: IProducutRemoveLinkProp) {
  return (
    <Button
      danger
      type="primary"
      onClick={async () => {
        const response = await deleteSectionProduct([props.sectionId, [props.productId]])
        if (response.success) {
          eventBus.publish(REFRESH_SECTION_PRODUCT_PAGE)
        }
      }}
    >
      Remove
    </Button>
  )
}

export default ProductRemoveLink
