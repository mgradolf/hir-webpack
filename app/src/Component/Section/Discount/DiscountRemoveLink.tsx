import React from "react"
import { removeSectionDiscounts } from "~/ApiServices/Service/SectionService"
import { eventBus, REFRESH_SECTION_DISCOUNT_PAGE } from "~/utils/EventBus"
import { Button } from "antd"

interface IDiscountRemoveLinkProp {
  sectionDiscountId: number
}
function DiscountRemoveLink(props: IDiscountRemoveLinkProp) {
  return (
    <Button
      type="link"
      onClick={async () => {
        const response = await removeSectionDiscounts({ SectionDiscountIDs: [props.sectionDiscountId] })
        if (response.success) {
          eventBus.publish(REFRESH_SECTION_DISCOUNT_PAGE)
        }
      }}
    >
      Remove
    </Button>
  )
}

export default DiscountRemoveLink
