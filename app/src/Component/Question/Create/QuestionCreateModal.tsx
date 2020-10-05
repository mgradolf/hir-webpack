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
import { createQuestion, addTagQuestions } from "~/ApiServices/Service/QuestionService"
import { eventBus, REFRESH_QUESTION_PAGE } from "~/utils/EventBus"

interface IQuestionModal {
  closeModal?: () => void
  SectionID?: number
  EventID?: number
  TagTypeID?: number
  TagID?: number
}

function QuestionCreateModal(props: IQuestionModal) {
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const onFormSubmission = (Params: any) => {
    Params.PreferenceValueTypeID = Number(Params.PreferenceValueTypeID)
    Params.OrganizationID = Number(Params.OrganizationID)
    setErrorMessages([])
    setApiCallInProgress(true)
    createQuestion(Params).then((x) => {
      setApiCallInProgress(false)
      if (x.success) {
        addTagQuestions({
          Questions: [{ PreferenceDefID: x.data.PreferenceDefID, TagID: props.TagID, EventID: props.EventID }]
        }).then((y) => {
          if (y.success) {
            eventBus.publish(REFRESH_QUESTION_PAGE)
            props.closeModal && props.closeModal()
          } else {
            setErrorMessages(y.error)
          }
        })
      } else {
        setErrorMessages(x.error)
      }
    })
  }
  return (
    <Modal
      showModal={true}
      width="800px"
      loading={false}
      apiCallInProgress={apiCallInProgress}
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
