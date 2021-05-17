import React, { useState } from "react"
import { Button } from "antd"
import OfferingApprovalFormModal from "~/Component/Feature/OfferingApproval/OfferingApprovalFormModal"

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
      {showModal && (
        <OfferingApprovalFormModal
          statusCode={props.statusCode}
          offeringID={props.offeringId}
          closeModal={() => setShowModal(false)}
        />
      )}
    </>
  )
}
