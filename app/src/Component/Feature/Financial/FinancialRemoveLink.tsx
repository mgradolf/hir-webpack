import React from "react"
import { deleteFinancial } from "~/ApiServices/Service/FinancialService"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"
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
              eventBus.publish(REFRESH_PAGE)
            }
            return x
          })
        })
      }
    />
  )
}

export default FinancialRemoveLink
