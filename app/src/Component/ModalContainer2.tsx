import React from "react"
import { IModalStates } from "~/Store/ModalState2"
import { connect } from "react-redux"
import { AppState } from "~/Store"
import LoginModal from "~/Component/Login/LoginModal"
import { SECTION_COMMENT_MODAL } from "~/Store/ModalState2/ModalNames"

function ModalContainer(modalState: IModalStates) {
  let defaultModal = undefined
  if (modalState.defaultModal && modalState.defaultModal.isOpen) {
    switch (modalState.defaultModal.modalName) {
      case SECTION_COMMENT_MODAL:
        defaultModal = <LoginModal />
        break
      default:
        defaultModal = <></>
    }
  }
  return <>{defaultModal}</>
}

const mapStateToProps = (state: AppState) => {
  return state.modalState2
}

export default connect(mapStateToProps)(ModalContainer)
