import React from "react"
import { Button } from "antd"
import { removeOfferingFinancialById } from "~/ApiServices/Service/EntityService"
import { eventBus, REFRESH_OFFERING_FINANCIAL_PAGE } from "~/utils/EventBus"

interface IFinancialRemoveLinkProp {
  offeringId: number
  financialId: number
}
function FinancialRemoveLink(props: IFinancialRemoveLinkProp) {
  return (
    <Button
      block
      type="link"
      onClick={async () => {
        const response = await removeOfferingFinancialById(props.financialId)
        if (response.success) {
          eventBus.publish(REFRESH_OFFERING_FINANCIAL_PAGE)
        }
      }}
    >
      Remove
    </Button>
  )
}

export default FinancialRemoveLink
