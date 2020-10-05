import * as React from "react"
import { Form } from "antd"
import Modal from "~/Component/Common/Modal"
import { useState } from "react"
import CreateDiscountForm from "~/Component/Section/Discount/DiscountCreateForm"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showCreateDiscountModal } from "~/Store/ModalState"
import { redirect } from "~/Store/ConnectedRoute"

interface ICreateNewDiscountProps {
  sectionId: number
  redirect?: (url: string) => void
  closeCreateDiscountModal?: () => void
}

function CreateNewDiscount(props: ICreateNewDiscountProps) {
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)

  const handleCancel = () => {
    if (props.closeCreateDiscountModal) {
      props.closeCreateDiscountModal()
    }
  }

  return (
    <Modal
      showModal={true}
      width="800px"
      apiCallInProgress={apiCallInProgress}
      children={
        <>
          <CreateDiscountForm
            sectionId={props.sectionId}
            handleCancel={handleCancel}
            formInstance={formInstance}
            setApiCallInProgress={setApiCallInProgress}
          />
        </>
      }
    />
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    closeCreateDiscountModal: () => dispatch(showCreateDiscountModal(false)),
    redirect: (url: string) => dispatch(redirect(url))
  }
}

export default connect(undefined, mapDispatchToProps)(CreateNewDiscount)
