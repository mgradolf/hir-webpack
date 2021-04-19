import React from "react"
import { Button } from "antd"
import { removeFinancials } from "~/ApiServices/Service/SectionService"
import { eventBus } from "~/utils/EventBus"
import { REFRESH_SECTION_BUDGET_PAGE } from "~/TableSearchMeta/Section/SectionDetailsMeta"
import { DeleteOutlined } from "@ant-design/icons"
import { showDeleteConfirm } from "~/Component/Common/Modal/Confirmation"

interface IBudgetRemoveLinkProp {
  sectionFinancialId: number
}

export function BudgetRemoveLink(props: IBudgetRemoveLinkProp) {
  return (
    <Button
      type="primary"
      danger
      icon={<DeleteOutlined />}
      shape="circle"
      onClick={() =>
        showDeleteConfirm(() => {
          return removeFinancials({ SectionFinancialIDs: [props.sectionFinancialId] }).then((x) => {
            if (x && x.success) {
              eventBus.publish(REFRESH_SECTION_BUDGET_PAGE)
            }
            return x
          })
        })
      }
    />
  )
}
