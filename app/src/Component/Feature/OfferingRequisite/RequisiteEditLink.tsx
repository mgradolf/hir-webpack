import React, { useState } from "react"
import OfferingRequisiteGroupFormModal from "~/Component/Feature/OfferingRequisite/RequisiteFormModal"
import { IconButton } from "~/Component/Common/Form/Buttons/IconButton"

interface IRequisiteGroupEditLinkProp {
  offeringId: number
  requisiteGroupId?: number
}

export default function RequisiteGroupEditLink(props: IRequisiteGroupEditLinkProp) {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <IconButton
        toolTip="Edit Selected Pre Requisite Group"
        iconType="edit"
        onClick={() => setShowModal && setShowModal(true)}
        disabled={props.requisiteGroupId === undefined}
      />

      {showModal && (
        <OfferingRequisiteGroupFormModal
          offeringID={props.offeringId}
          requisiteGroupID={props.requisiteGroupId}
          closeModal={() => setShowModal(false)}
        />
      )}
    </>
  )
}
