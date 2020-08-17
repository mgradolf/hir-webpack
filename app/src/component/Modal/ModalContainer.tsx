import React from "react"
import { AppState } from "~/store"
import LoginModal from "~/component/Login/LoginModal"
import CreateNewOfferingModal from "~/component/Offering/CreateEdit/OfferingFormModal"
import OfflineAlert from "~/component/Alerts/Offline"
import { IModalState } from "~/store/ModalState"
import { connect } from "react-redux"

function ModalContainer(modalState: IModalState) {
  return (
    <>
      <OfflineAlert />
      {modalState.loginModal && <LoginModal />}
      {modalState.createOfferingModal && <CreateNewOfferingModal />}
    </>
  )
}

const mapStateToProps = (state: AppState) => {
  return state.modalState
}

export default connect(mapStateToProps)(ModalContainer)
