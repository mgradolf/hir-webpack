import React, { useState } from "react"
import { Button } from "antd"
import FinancialRemoveLink from "~/Component/Feature/Financial/FinancialRemoveLink"
import CreateNewFinancial from "~/Component/Feature/Financial/FinancialFormModal"
import { EditOutlined } from "@ant-design/icons"

interface IFinancialMenu {
  applyToID: number
  financialId: number
  financialType: string
}

export default function FinancialMenu(props: IFinancialMenu) {
  const [showUpdateModal, setShowUpdateModal] = useState(false)

  return (
    <>
      <Button
        type="primary"
        icon={<EditOutlined />}
        shape="circle"
        onClick={() => {
          setShowUpdateModal(true)
        }}
      />
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
