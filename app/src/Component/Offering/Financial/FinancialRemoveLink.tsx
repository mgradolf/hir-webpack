import React from "react"
import { removeOfferingFinancialById } from "~/ApiServices/Service/EntityService"
import { eventBus, REFRESH_OFFERING_FINANCIAL_PAGE } from "~/utils/EventBus"
import { Button } from "antd"

interface IFinancialRemoveLinkProp {
  offeringId: number
  financialId: number
}
function FinancialRemoveLink(props: IFinancialRemoveLinkProp) {
  return (
    <Button
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
