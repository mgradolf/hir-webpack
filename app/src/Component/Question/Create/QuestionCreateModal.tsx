import React, { useState } from "react"
import { Dispatch } from "redux"
import { connect } from "react-redux"
import { AppState } from "~/Store"
import { redirect } from "~/Store/ConnectedRoute"
import { showQuestionCreateModal } from "~/Store/ModalState"
import { Form } from "antd"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import Modal from "~/Component/Common/Modal"
import QuestionCreateForm from "~/Component/Question/Create/QuestionCreateForm"

interface IQuestionModal {
  closeModal?: () => void
  SectionID?: number
  EventID?: number
  TagTypeID?: number
  TagID?: number
}

function QuestionCreateModal(props: IQuestionModal) {
  const [formInstance] = Form.useForm()
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const onFormSubmission = (Params: any) => {
    console.log(Params)
  }
  return (
    <Modal
      showModal={true}
      width="800px"
      loading={false}
      apiCallInProgress={false}
      closable={true}
      closeModal={props.closeModal}
      children={
        <>
          <QuestionCreateForm
            formInstance={formInstance}
            errorMessages={errorMessages}
            setErrorMessages={setErrorMessages}
            handleCancel={props.closeModal}
            onFormSubmission={onFormSubmission}
          />
        </>
      }
    />
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    closeModal: () => dispatch(showQuestionCreateModal(false)),
    redirect: (url: string) => dispatch(redirect(url))
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    SectionID: state.modalState.questionCreateModal.config.SectionID,
    EventID: state.modalState.questionCreateModal.config.EventID,
    TagTypeID: state.modalState.questionCreateModal.config.TagTypeID,
    TagID: state.modalState.questionCreateModal.config.TagID
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(QuestionCreateModal)
