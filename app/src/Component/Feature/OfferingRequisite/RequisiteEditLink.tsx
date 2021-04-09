import React, { useState } from "react"
import OfferingRequisiteGroupFormModal from "~/Component/Feature/OfferingRequisite/RequisiteFormModal"
import { CreateEditRemoveIconButton } from "~/Component/Common/Form/Buttons/CreateEditRemoveIconButton"

interface IRequisiteGroupEditLinkProp {
  offeringId: number
  requisiteGroupId?: number
}

export default function RequisiteGroupEditLink(props: IRequisiteGroupEditLinkProp) {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <CreateEditRemoveIconButton
        toolTip="Edit Selected Pre Requisite Group"
        iconType="edit"
        onClick={() => setShowModal && setShowModal(true)}
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
