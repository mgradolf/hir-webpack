import React, { useState } from "react"
import OfferingRequisiteGroupFormModal from "~/Component/Feature/OfferingRequisite/RequisiteFormModal"
import { CreateEditRemoveIconButton } from "~/Component/Common/Form/Buttons/CreateEditRemoveIconButton"

interface IPrerequisiteGroupModalOpenButtonProp {
  OfferingID: number
}

export default function PrerequisiteGroupModalOpenButton(props: IPrerequisiteGroupModalOpenButtonProp) {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <CreateEditRemoveIconButton
        toolTip="Add Pre Requisite Group"
        iconType="create"
        onClick={() => setShowModal && setShowModal(true)}
      />
      {showModal && (
        <OfferingRequisiteGroupFormModal offeringID={props.OfferingID} closeModal={() => setShowModal(false)} />
      )}
    </>
  )
}
