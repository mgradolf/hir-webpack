import React from "react"
import Modal from "~/Component/Common/Modal/index2"
import RegistrationActionForm from "~/Component/Feature/Registration/RegistrationActionForm"

interface IRegistrationFormProps {
  initialFormValue: { [key: string]: any }
  closeModal?: () => void
}

export default function RegistrationActionFormModal(props: IRegistrationFormProps) {
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
          <RegistrationActionForm
            initialFormValue={props.initialFormValue}
            handleCancel={handleCancel}
            closeModal={props.closeModal}
          />
        </>
      }
    />
  )
}
