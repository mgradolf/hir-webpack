import React from "react"
import { deleteFinancial } from "~/ApiServices/Service/FinancialService"
import {
  eventBus,
  REFRESH_FACULTY_OFFERINGS_TAB,
  REFRESH_MAREKTING_PROGRAM_OFFERINGS_TAB,
  REFRESH_OFFERING_FINANCIAL_PAGE,
  REFRESH_RESOURCE_OFFERINGS_TAB
} from "~/utils/EventBus"
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
          eventBus.publish(REFRESH_FACULTY_OFFERINGS_TAB)
          eventBus.publish(REFRESH_MAREKTING_PROGRAM_OFFERINGS_TAB)
          eventBus.publish(REFRESH_RESOURCE_OFFERINGS_TAB)
        }
      }}
    >
      Remove
    </Button>
  )
}

export default FinancialRemoveLink
