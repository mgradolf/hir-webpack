import React from "react"
import { AppState } from "~/store"
import OfflineAlert from "~/component/Alerts/Offline"
import LoginModal from "~/component/Login/LoginModal"
import CreateNewOfferingModal from "~/component/Offering/CreateEdit/OfferingFormModal"
import OfferingFinancialFormModal from "~/component/Offering/Financial/OfferingFinancialFormModal"
import OfferingApprovalFormModal from "~/component/Offering/Approval/OfferingApprovalFormModal"
import OfferingRequisiteGroupFormModal from "~/component/Offering/Requisite/RequisiteFormModal"
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
      {modalState.offeringPrerequisiteGroupModal.value && (
        <OfferingRequisiteGroupFormModal
          offeringID={modalState.offeringPrerequisiteGroupModal.config.offeringId}
          requisiteGroupID={modalState.offeringPrerequisiteGroupModal.config.requisiteGroupId}
        />
      )}
    </>
  )
}

const mapStateToProps = (state: AppState) => {
  return state.modalState
}

export default connect(mapStateToProps)(ModalContainer)
