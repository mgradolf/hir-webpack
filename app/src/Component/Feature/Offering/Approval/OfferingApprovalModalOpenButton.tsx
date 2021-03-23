import React, { useState } from "react"
import { Button } from "antd"
import OfferingApprovalFormModal from "~/Component/Feature/Offering/Approval/OfferingApprovalFormModal"

interface ICreateActionButtonProp {
  offeringId: number
  statusCode: string
  closeModal?: () => void
}

export default function OfferingApprovalModalOpenButton(props: ICreateActionButtonProp) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      {props.statusCode !== "Open" && (
        <Button type="primary" onClick={() => setShowModal && setShowModal(true)}>
          Manage Approval
        </Button>
      )}
      {showModal && <OfferingApprovalFormModal offeringID={props.offeringId} closeModal={() => setShowModal(false)} />}
    </>
  )
}
