import React, { useState } from "react"
import { IconButton } from "~/Component/Common/Form/Buttons/IconButton"
import AdmissionReqGroupFormModal from "~/Component/Feature/ProgramAdmissionRequirement/AdmissionReqGroupFormModal"

interface IAdmissionReqGroupEditLinkProp {
  ProgramID: number
  ProgramAdmReqGroupID?: number
}

export default function AdmissionReqGroupEditLink(props: IAdmissionReqGroupEditLinkProp) {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <IconButton
        toolTip="Edit Selected Admission Requirement Group"
        iconType="edit"
        onClick={() => setShowModal && setShowModal(true)}
      />

      {showModal && (
        <AdmissionReqGroupFormModal
          ProgramID={props.ProgramID}
          ProgramAdmReqGroupID={props.ProgramAdmReqGroupID}
          closeModal={() => setShowModal(false)}
        />
      )}
    </>
  )
}
