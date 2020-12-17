import * as React from "react"
import { Form } from "antd"
import Modal from "~/Component/Common/Modal/index2"
import { useState } from "react"
import CreateDiscountForm from "~/Component/Section/Discount/DiscountCreateForm"

interface ICreateNewDiscountProps {
  sectionId: number
  closeModal?: () => void
}

export default function CreateNewDiscount(props: ICreateNewDiscountProps) {
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)

  const handleCancel = () => {
    if (props.closeModal) {
      props.closeModal()
    }
  }

  return (
    <Modal
      width="800px"
      apiCallInProgress={apiCallInProgress}
      children={
        <>
          <CreateDiscountForm
            sectionId={props.sectionId}
            handleCancel={handleCancel}
            formInstance={formInstance}
            closeModal={props.closeModal}
            setApiCallInProgress={setApiCallInProgress}
          />
        </>
      }
    />
  )
}
