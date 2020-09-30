import React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { AppState } from "~/Store"
import { redirect } from "~/Store/ConnectedRoute"
import { showQuestionFindModal } from "~/Store/ModalState"
import Modal from "~/Component/Common/Modal"

interface IQuestionModal {
  closeModal?: () => void
  SectionID?: number
  EventID?: number
  TagTypeID?: number
  TagID?: number
}

function QuestionFindModal(props: IQuestionModal) {
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
    closeModal: () => dispatch(showQuestionFindModal(false)),
    redirect: (url: string) => dispatch(redirect(url))
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    SectionID: state.modalState.questionFindModal.config.SectionID,
    EventID: state.modalState.questionFindModal.config.EventID,
    TagTypeID: state.modalState.questionFindModal.config.TagTypeID,
    TagID: state.modalState.questionFindModal.config.TagID
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(QuestionFindModal)
