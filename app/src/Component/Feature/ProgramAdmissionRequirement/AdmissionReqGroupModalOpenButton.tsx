import React, { useState } from "react"
import { IconButton } from "~/Component/Common/Form/Buttons/IconButton"
import AdmissionReqGroupFormModal from "~/Component/Feature/ProgramAdmissionRequirement/AdmissionReqGroupFormModal"

interface IAdmissionReqGroupModalOpenButtonProp {
  ProgramID: number
}

export function AdmissionReqGroupModalOpenButton(props: IAdmissionReqGroupModalOpenButtonProp) {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <IconButton
        toolTip="Add Admission Requirement Group"
        iconType="create"
        onClick={() => setShowModal && setShowModal(true)}
      />
      {showModal && <AdmissionReqGroupFormModal ProgramID={props.ProgramID} closeModal={() => setShowModal(false)} />}
    </>
  )
}
