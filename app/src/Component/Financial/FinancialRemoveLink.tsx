import React from "react"
import { deleteFinancial } from "~/ApiServices/Service/FinancialService"
import { eventBus, REFRESH_OFFERING_FINANCIAL_PAGE } from "~/utils/EventBus"
import { Button } from "antd"

interface IFinancialRemoveLinkProp {
  financialId: number
}
function FinancialRemoveLink(props: IFinancialRemoveLinkProp) {
  return (
    <Button
      type="link"
      onClick={async () => {
        const response = await deleteFinancial({ FinancialID: props.financialId })
        if (response && response.success) {
          eventBus.publish(REFRESH_OFFERING_FINANCIAL_PAGE)
        }
      }}
    >
      Remove
    </Button>
  )
}

export default FinancialRemoveLink
