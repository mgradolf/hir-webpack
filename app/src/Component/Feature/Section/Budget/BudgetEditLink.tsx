import React, { useState } from "react"
import { Button } from "antd"
import { EditOutlined } from "@ant-design/icons"
import { BudgetEditFormModal } from "~/Component/Feature/Section/Budget/BudgetEditFormModal"

interface IBudgetEditLinkProp {
  sectionId: number
  financialId: number
  seatGroups: Array<any>
  helpKey?: string
}

export function BudgetEditLink(props: IBudgetEditLinkProp) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Button
        type="primary"
        icon={<EditOutlined />}
        shape="circle"
        style={{ marginRight: "5px" }}
        onClick={() => {
          setShowModal(true)
        }}
      />
      {showModal && (
        <BudgetEditFormModal
          sectionId={props.sectionId}
          financialId={props.financialId}
          seatGroups={props.seatGroups}
          closeModal={() => setShowModal(false)}
          helpKey={props.helpKey}
        />
      )}
    </>
  )
}
