import React, { useState } from "react"
import OfferingApprovalFormModal from "~/Component/Feature/OfferingApproval/OfferingApprovalFormModal"
import { IconButton } from "~/Component/Common/Form/Buttons/IconButton"

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
        <IconButton iconType="create" toolTip="Manage Approval" onClick={() => setShowModal && setShowModal(true)} />
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
