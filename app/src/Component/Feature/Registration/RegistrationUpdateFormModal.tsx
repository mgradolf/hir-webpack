import React from "react"
import Modal from "~/Component/Common/Modal/index2"
import RegistrationUpdateForm from "~/Component/Feature/Registration/RegistrationUpdateForm"
import "~/Sass/utils.scss"

interface IRegistrationUpdateFormProps {
  initialFormValue: { [key: string]: any }
  closeModal?: () => void
}

export default function RegistrationUpdateFormModal(props: IRegistrationUpdateFormProps) {
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
          <RegistrationUpdateForm
            initialFormValue={props.initialFormValue}
            handleCancel={handleCancel}
            closeModal={props.closeModal}
          />
        </>
      }
    />
  )
}
