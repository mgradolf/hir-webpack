import React from "react"
import Modal from "~/Component/Common/Modal/index2"
import RegistrationGradeForm from "~/Component/Feature/Registration/RegistrationGradeForm"

interface IRegistrationGradeFormProps {
  initialFormValue: { [key: string]: any }
  closeModal?: () => void
}

export default function RegistrationGradeFormModal(props: IRegistrationGradeFormProps) {
  const handleCancel = () => {
    if (props.closeModal) {
      props.closeModal()
    }
  }

  return (
    <Modal
      width="800px"
      children={
        <>
          <RegistrationGradeForm
            initialFormValue={props.initialFormValue}
            handleCancel={handleCancel}
            closeModal={props.closeModal}
          />
        </>
      }
    />
  )
}
