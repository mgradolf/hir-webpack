import React, { useState } from "react"
import { IconButton } from "~/Component/Common/Form/Buttons/IconButton"
import { AdmissionReqFormModal } from "~/Component/Feature/ProgramAdmissionRequirement/AdmissionReqFormModal"

interface IAdmissionReqModalButtonProp {
  ProgramAdmReqGroupID: number | undefined
  HasAdmReqGroup: boolean
}

export function AdmissionReqModalButton(props: IAdmissionReqModalButtonProp) {
  const [openModal, setOpenModal] = useState(false)
  const onClick = () => {
    setOpenModal(true)
  }

  return (
    <>
      {openModal && <AdmissionReqFormModal {...props} closeModal={() => setOpenModal(false)} />}
      {props.HasAdmReqGroup && <IconButton toolTip="Add Requirement" iconType="create" onClick={onClick} />}
    </>
  )
}
