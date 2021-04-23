import React, { useState } from "react"
import { IconButton } from "~/Component/Common/Form/Buttons/IconButton"
import { AdmissionReqFormModal } from "~/Component/Feature/ProgramAdmissionRequirement/AdmissionReqFormModal"

interface IAdmissionReqEditLinkProp {
  ProgramAdmReqGroupID?: number
  ProgramAdmReqID?: number
}

export default function AdmissionReqEditLink(props: IAdmissionReqEditLinkProp) {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <IconButton
        toolTip="Edit Admission Requirement"
        iconType="edit"
        onClick={() => setShowModal && setShowModal(true)}
      />

      {showModal && (
        <AdmissionReqFormModal
          ProgramAdmReqID={props.ProgramAdmReqID}
          ProgramAdmReqGroupID={props.ProgramAdmReqGroupID}
          closeModal={() => setShowModal(false)}
        />
      )}
    </>
  )
}
