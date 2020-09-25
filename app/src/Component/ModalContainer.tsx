import React from "react"
import { AppState } from "~/Store"
import OfflineAlert from "~/Component/Alerts/Offline"
import LoginModal from "~/Component/Login/LoginModal"
import CreateNewOfferingModal from "~/Component/Offering/CreateEdit/OfferingFormModal"
import OfferingFinancialFormModal from "~/Component/Offering/Financial/OfferingFinancialFormModal"
import OfferingApprovalFormModal from "~/Component/Offering/Approval/OfferingApprovalFormModal"
import OfferingRequisiteGroupFormModal from "~/Component/Offering/Requisite/RequisiteFormModal"
import AddOfferingFromRequisiteGroupModal from "~/Component/Offering/Requisite/AddOfferingFromRequisiteGroupModal"
import AddInstructorFromInstructorModal from "~/Component/Offering/QualifiedInstructor/AddInstructorFromInstructorModal"
import SectionFormModal from "~/Component/Offering/Section/CreateEdit/SectionFormModal"
import SectionSeatGroupFormModal from "~/Component/Section/SeatGroup/SectionSeatGroupFormModal"
import SeatGroupAffiliatedOrganization from "~/Component/Section/SeatGroup/SeatGroupAffiliatedOrganizationModal"
import { IModalState } from "~/Store/ModalState"
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
      {modalState.addOfferingFromRequisiteGroupModal.value && (
        <AddOfferingFromRequisiteGroupModal
          offeringID={modalState.addOfferingFromRequisiteGroupModal.config.offeringId}
          requisiteGroupID={modalState.addOfferingFromRequisiteGroupModal.config.requisiteGroupId}
        />
      )}
      {modalState.addInstructorFromInstructorModal.value && (
        <AddInstructorFromInstructorModal
          offeringID={modalState.addInstructorFromInstructorModal.config.offeringId}
          rowData={modalState.addInstructorFromInstructorModal.config.rowData}
        />
      )}
      {modalState.createSectionModal.value && <SectionFormModal />}
      {modalState.createSectionSeatGroupModal.value && (
        <SectionSeatGroupFormModal
          sectionId={modalState.createSectionSeatGroupModal.config.sectionId}
          seatgroupId={modalState.createSectionSeatGroupModal.config.seatgroupId}
        />
      )}
      {modalState.addSeatGroupAffiliateOrganization.value && (
        <SeatGroupAffiliatedOrganization
          seatgroupId={modalState.addSeatGroupAffiliateOrganization.config.seatgroupId}
        />
      )}
    </>
  )
}

const mapStateToProps = (state: AppState) => {
  return state.modalState
}

export default connect(mapStateToProps)(ModalContainer)
