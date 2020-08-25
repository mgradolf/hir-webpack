import React from "react"
import { Button } from "antd"
import { removeOfferingFinancialById } from "~/ApiServices/Service/EntityService"
import EventBus from "~/utils/EventBus"
import { REFRESH_OFFERING_FINANCIAL_PAGE } from "~/utils/EventList"

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
          EventBus.publish(REFRESH_OFFERING_FINANCIAL_PAGE)
        }
      }}
    >
      Remove
    </Button>
  )
}

export default FinancialRemoveLink
