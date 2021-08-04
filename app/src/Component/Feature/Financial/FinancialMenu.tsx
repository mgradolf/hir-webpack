import React, { useState } from "react"
import { Button, Tooltip } from "antd"
import FinancialRemoveLink from "~/Component/Feature/Financial/FinancialRemoveLink"
import CreateNewFinancial from "~/Component/Feature/Financial/FinancialFormModal"
import { EditOutlined } from "@ant-design/icons"

interface IFinancialMenu {
  applyToID: number
  financialId: number
  financialType: string
}

export function FinancialMenu(props: IFinancialMenu) {
  const [showUpdateModal, setShowUpdateModal] = useState(false)

  return (
    <>
      <Tooltip title="Edit">
        <Button
          type="primary"
          icon={<EditOutlined />}
          shape="circle"
          onClick={() => {
            setShowUpdateModal(true)
          }}
        />
      </Tooltip>
      {showUpdateModal && (
        <CreateNewFinancial
          applyToID={props.applyToID}
          financialType={props.financialType}
          financialID={props.financialId}
          closeModal={() => setShowUpdateModal(false)}
        />
      )}
      <FinancialRemoveLink financialId={props.financialId} />
    </>
  )
}
