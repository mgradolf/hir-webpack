import React from "react"
import { Dispatch } from "redux"
import { connect } from "react-redux"
import { AppState } from "~/Store"
import { redirect } from "~/Store/ConnectedRoute"
import { showQuestionCreateModal } from "~/Store/ModalState"
import Modal from "~/Component/Common/Modal"

interface IQuestionModal {
  closeModal?: () => void
  SectionID?: number
  EventID?: number
  TagTypeID?: number
  TagID?: number
}

function QuestionCreateModal(props: IQuestionModal) {
  return (
    <Modal
      showModal={true}
      width="800px"
      loading={false}
      apiCallInProgress={false}
      closable={true}
      closeModal={props.closeModal}
      children={<>Hello World</>}
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
