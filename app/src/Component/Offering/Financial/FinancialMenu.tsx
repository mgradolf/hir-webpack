import React, { useState } from "react"
import { Button, Menu } from "antd"
import FinancialRemoveLink from "~/Component/Offering/Financial/FinancialRemoveLink"
import CreateNewOfferingFinancial from "~/Component/Offering/Financial/OfferingFinancialFormModal"

interface IFinancialMenu {
  offeringId: number
  financialId: number
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
          <CreateNewOfferingFinancial
            offeringID={props.offeringId}
            offeringFinancialId={props.financialId}
            closeModal={() => setShowUpdateModal(false)}
          />
        )}
      </Menu.Item>
      <Menu.Item key="1">
        <FinancialRemoveLink offeringId={props.offeringId} financialId={props.financialId} />
      </Menu.Item>
    </Menu>
  )
}
