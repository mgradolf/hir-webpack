import React, { useState } from "react"
import OfferingRequisiteGroupFormModal from "~/Component/Feature/OfferingRequisite/RequisiteFormModal"
import { IconButton } from "~/Component/Common/Form/Buttons/IconButton"

interface IPrerequisiteGroupModalOpenButtonProp {
  OfferingID: number
}

export function PrerequisiteGroupModalOpenButton(props: IPrerequisiteGroupModalOpenButtonProp) {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <IconButton
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
