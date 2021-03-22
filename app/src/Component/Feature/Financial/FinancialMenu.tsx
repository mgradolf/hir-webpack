import React, { useState } from "react"
import { Button, Menu } from "antd"
import FinancialRemoveLink from "~/Component/Feature/Financial/FinancialRemoveLink"
import CreateNewFinancial from "~/Component/Feature/Financial/FinancialFormModal"

interface IFinancialMenu {
  applyToID: number
  financialId: number
  financialType: string
}

export default function FinancialMenu(props: IFinancialMenu) {
  const [showUpdateModal, setShowUpdateModal] = useState(false)

  return (
    <Menu>
      <Menu.Item key="0">
        <Button
          type="link"
          onClick={() => {
            setShowUpdateModal(true)
          }}
        >
          Edit
        </Button>
        {showUpdateModal && (
          <CreateNewFinancial
            applyToID={props.applyToID}
            financialType={props.financialType}
            financialID={props.financialId}
            closeModal={() => setShowUpdateModal(false)}
          />
        )}
      </Menu.Item>
      <Menu.Item key="1">
        <FinancialRemoveLink financialId={props.financialId} />
      </Menu.Item>
    </Menu>
  )
}
