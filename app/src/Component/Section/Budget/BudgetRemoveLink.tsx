import React from "react"
import { removeFinancials } from "~/ApiServices/Service/SectionService"
import { eventBus, REFRESH_SECTION_BUDGET_PAGE } from "~/utils/EventBus"
import { Button } from "antd"

interface IBudgetRemoveLinkProp {
  sectionFinancialId: number
}
function BudgetRemoveLink(props: IBudgetRemoveLinkProp) {
  return (
    <Button
      type="link"
      onClick={async () => {
        const response = await removeFinancials({ SectionFinancialIDs: [props.sectionFinancialId] })
        if (response.success) {
          eventBus.publish(REFRESH_SECTION_BUDGET_PAGE)
        }
      }}
    >
      Remove
    </Button>
  )
}

export default BudgetRemoveLink
