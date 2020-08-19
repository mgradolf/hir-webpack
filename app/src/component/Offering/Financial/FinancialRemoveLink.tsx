import React from "react"
import { Button } from "antd"
import {} from "~/ApiServices/Service/OfferingService"

interface IFinancialRemoveLinkProp {
  offeringId: number
  financialId?: number
}
function FinancialRemoveLink(props: IFinancialRemoveLinkProp) {
  return (
    <Button
      block
      type="link"
      onClick={async () => {
        // const response = await removeOfferingFinancial(financialId)
      }}
    >
      Remove
    </Button>
  )
}

export default FinancialRemoveLink
