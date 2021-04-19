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
import { showDeleteConfirm } from "~/Component/Common/Modal/Confirmation"
import { DeleteOutlined } from "@ant-design/icons"

interface IFinancialRemoveLinkProp {
  financialId: number
}

function FinancialRemoveLink(props: IFinancialRemoveLinkProp) {
  return (
    <Button
      danger
      type="primary"
      icon={<DeleteOutlined />}
      shape="circle"
      style={{ marginLeft: "10px" }}
      onClick={() =>
        showDeleteConfirm(() => {
          return deleteFinancial({ FinancialID: props.financialId }).then((x) => {
            if (x && x.success) {
              eventBus.publish(REFRESH_OFFERING_FINANCIAL_PAGE)
              eventBus.publish(REFRESH_FACULTY_OFFERINGS_TAB)
              eventBus.publish(REFRESH_MAREKTING_PROGRAM_OFFERINGS_TAB)
              eventBus.publish(REFRESH_RESOURCE_OFFERINGS_TAB)
            }
            return x
          })
        })
      }
    />
  )
}

export default FinancialRemoveLink
