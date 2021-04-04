import React from "react"
import { AppState } from "~/Store"
import { IModalState } from "~/Store/ModalState"
import { connect } from "react-redux"
import OfflineAlert from "~/Component/Alerts/Offline"
import LoginModal from "~/Component/Login/LoginModal"
import OfferingApprovalFormModal from "~/Component/Feature/Offering/Approval/OfferingApprovalFormModal"
import OfferingRequisiteGroupFormModal from "~/Component/Feature/Offering/Requisite/RequisiteFormModal"
import SectionCopyModal from "~/Component/Feature/Section/Copy/SectionCopyModal"
import SectionSeatGroupFormModal from "~/Component/Feature/Section/SeatGroup/SectionSeatGroupFormModal"
import SeatGroupAffiliatedOrganization from "~/Component/Feature/Section/SeatGroup/SeatGroupAffiliatedOrganizationModal"
import ScheduleFormModal from "~/Component/Feature/Section/Schedule/ScheduleFormModal"
import ScheduleLocationFromModal from "~/Component/Feature/Section/Schedule/ScheduleLocationFormModal"
import ScheduleInstructorFromModal from "~/Component/Feature/Section/Schedule/ScheduleInstructorFormModal"
import AddProgramModal from "~/Component/Feature/Program/AddProgramModal"
import BudgetFormModal from "~/Component/Feature/Section/Budget/BudgetFormModal"
import BudgetEditFormModal from "~/Component/Feature/Section/Budget/BudgetEditFormModal"
import DiscountFomrModal from "~/Component/Feature/Section/Discount/DiscountFormModal"
import DiscountEditFormModal from "~/Component/Feature/Section/Discount/DiscountEditFormModal"
import NoticeEditFormModal from "~/Component/Feature/Section/Notice/NoticeEditFormModal"
import ViewResponseModal from "~/Component/Feature/Section/Request/ViewResponseModal"

import { REQUEST_RESOLUTION_NAMES } from "~/utils/Constants"
import AnswerQuestionsModal from "~/Component/Feature/Section/Request/Resolutions/AnswerQuestionsModal"
import EditBlockerModal from "~/Component/Feature/Section/Request/Resolutions/EditBlockerModal"
import PostPaymentModal from "~/Component/Feature/Section/Request/Resolutions/PostPaymentModal"
import SpecifyRecipientModal from "~/Component/Feature/Section/Request/Resolutions/SpecifyRecipientModal"
import StudentFinderModal from "~/Component/Feature/Student/StudentFinderModal"
import ErrorDetailsModal from "~/Component/Feature/Section/Request/Resolutions/ErrorDetailsModal"
import CommentCreateModal from "~/Component/Feature/Section/Comment/CommentCreateModal"
import AddContactModal from "~/Component/Feature/Student/AddContactModal"
import ScheduleNoteFormModal from "~/Component/Feature/Section/Schedule/ScheduleNoteFormModal"

function ModalContainer(modalState: IModalState) {
  return (
    <>
      <OfflineAlert />
      {modalState.loginModal.value && <LoginModal />}
      {modalState.offeringApprovalModal.value && (
        <OfferingApprovalFormModal offeringID={modalState.offeringApprovalModal.config.offeringId} />
      )}
      {modalState.offeringPrerequisiteGroupModal.value && (
        <OfferingRequisiteGroupFormModal
          offeringID={modalState.offeringPrerequisiteGroupModal.config.offeringId}
          requisiteGroupID={modalState.offeringPrerequisiteGroupModal.config.requisiteGroupId}
        />
      )}
      {modalState.copySectionModal.value && <SectionCopyModal />}
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
      {modalState.createSectionScheduleModal.value && (
        <ScheduleFormModal
          sectionId={modalState.createSectionScheduleModal.config.sectionId}
          scheduleIds={modalState.createSectionScheduleModal.config.scheduleIds}
        />
      )}
      {modalState.updateSectionScheduleLocationModal.value && (
        <ScheduleLocationFromModal scheduleIds={modalState.updateSectionScheduleLocationModal.config.scheduleIds} />
      )}
      {modalState.updateSectionScheduleInstructorModal.value && (
        <ScheduleInstructorFromModal
          scheduleIds={modalState.updateSectionScheduleInstructorModal.config.scheduleIds}
          sectionId={modalState.updateSectionScheduleInstructorModal.config.sectionId}
        />
      )}
      {modalState.updateSectionScheduleNoteModal.value && (
        <ScheduleNoteFormModal scheduleIds={modalState.updateSectionScheduleNoteModal.config.scheduleIds} />
      )}
      {modalState.addProgramModal.value && <AddProgramModal />}
      {modalState.createBudgetModal.value && (
        <BudgetFormModal sectionId={modalState.createBudgetModal.config.sectionId} />
      )}
      {modalState.updateBudgetModal.value && (
        <BudgetEditFormModal
          sectionId={modalState.updateBudgetModal.config.sectionId}
          financialId={modalState.updateBudgetModal.config.financialId}
          seatGroups={modalState.updateBudgetModal.config.seatGroups}
        />
      )}
      {modalState.createDiscountModal.value && (
        <DiscountFomrModal sectionId={modalState.createDiscountModal.config.sectionId} />
      )}
      {modalState.updateDiscountModal.value && (
        <DiscountEditFormModal
          sectionDiscountId={modalState.updateDiscountModal.config.sectionDiscountId}
          sectionId={modalState.updateDiscountModal.config.sectionId}
        />
      )}
      {modalState.updateNoticeModal.value && (
        <NoticeEditFormModal
          sectionId={modalState.updateNoticeModal.config.sectionId}
          sectionNoticeTypeId={modalState.updateNoticeModal.config.sectionNoticeTypeId}
        />
      )}
      {modalState.requestViewResponseModal.value && (
        <ViewResponseModal requestJson={modalState.requestViewResponseModal.config.requestJson} />
      )}
      {modalState.requestResolutionModal.value &&
        modalState.requestResolutionModal.config.resolutionJson.Key === REQUEST_RESOLUTION_NAMES.ANSWER_QUESTIONS && (
          <AnswerQuestionsModal fromVerification={false} taskJson={modalState.requestResolutionModal.config.taskJson} />
        )}
      {modalState.requestResolutionModal.value &&
        modalState.requestResolutionModal.config.resolutionJson.Key === REQUEST_RESOLUTION_NAMES.EDIT && (
          <EditBlockerModal
            taskJson={modalState.requestResolutionModal.config.taskJson}
            resolutionJson={modalState.requestResolutionModal.config.resolutionJson}
          />
        )}
      {modalState.requestResolutionModal.value &&
        modalState.requestResolutionModal.config.resolutionJson.Key === REQUEST_RESOLUTION_NAMES.POST_PAYMNET && (
          <PostPaymentModal
            taskJson={modalState.requestResolutionModal.config.taskJson}
            extraDataSource={modalState.requestResolutionModal.config.extraDataSource}
          />
        )}
      {modalState.requestResolutionModal.value &&
        modalState.requestResolutionModal.config.resolutionJson.Key === REQUEST_RESOLUTION_NAMES.SPECIFY_RECIPIENT && (
          <SpecifyRecipientModal
            taskJson={modalState.requestResolutionModal.config.taskJson}
            AccountID={modalState.requestResolutionModal.config.extraDataSource.AccountID}
          />
        )}
      {modalState.requestResolutionModal.value &&
        modalState.requestResolutionModal.config.resolutionJson.Key === REQUEST_RESOLUTION_NAMES.SWITCH_RECIPIENT && (
          <SpecifyRecipientModal
            taskJson={modalState.requestResolutionModal.config.taskJson}
            AccountID={modalState.requestResolutionModal.config.extraDataSource.AccountID}
          />
        )}
      {modalState.requestResolutionModal.value &&
        modalState.requestResolutionModal.config.resolutionJson.Key === REQUEST_RESOLUTION_NAMES.ERROR_DETAILS && (
          <ErrorDetailsModal taskJson={modalState.requestResolutionModal.config.taskJson} />
        )}
      {modalState.requestQuestionAnswerModal.value && (
        <AnswerQuestionsModal
          fromVerification={true}
          taskJson={modalState.requestQuestionAnswerModal.config.taskJson}
        />
      )}
      {modalState.studentFinderModal.value && (
        <StudentFinderModal
          onSelectStudent={modalState.studentFinderModal.config.onSelectStudentCallback}
          AccountID={modalState.studentFinderModal.config.AccountID}
        />
      )}
      {modalState.sectionCommentModal.value && <CommentCreateModal />}
      {modalState.addContactModal.value && <AddContactModal AccountID={modalState.addContactModal.config.AccountID} />}
    </>
  )
}

const mapStateToProps = (state: AppState) => {
  return state.modalState
}

export default connect(mapStateToProps)(ModalContainer)
