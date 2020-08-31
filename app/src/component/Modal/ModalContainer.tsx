import React from "react"
import { AppState } from "~/store"
import OfflineAlert from "~/Component/Alerts/Offline"
import LoginModal from "~/Component/Login/LoginModal"
import CreateNewOfferingModal from "~/Component/Offering/CreateEdit/OfferingFormModal"
import OfferingFinancialFormModal from "~/Component/Offering/Financial/OfferingFinancialFormModal"
import OfferingApprovalFormModal from "~/Component/Offering/Approval/OfferingApprovalFormModal"
import { IModalState } from "~/store/ModalState"
import { connect } from "react-redux"

function ModalContainer(modalState: IModalState) {
  return (
    <>
      <OfflineAlert />
      {modalState.loginModal.value && <LoginModal />}
      {modalState.createOfferingModal.value && (
        <CreateNewOfferingModal offeringId={modalState.createOfferingModal.config.OfferingId} />
      )}
      {modalState.createOfferingFinancialModal.value && (
        <OfferingFinancialFormModal
          offeringFinancialId={modalState.createOfferingFinancialModal.config.financialId}
          offeringID={modalState.createOfferingFinancialModal.config.offeringId}
        />
      )}
      {modalState.offeringApprovalModal.value && (
        <OfferingApprovalFormModal offeringID={modalState.offeringApprovalModal.config.offeringId} />
      )}
    </>
  )
}

const mapStateToProps = (state: AppState) => {
  return state.modalState
}

export default connect(mapStateToProps)(ModalContainer)
