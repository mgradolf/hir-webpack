import React from "react"
import { AppState } from "~/Store"
import { IModalState } from "~/Store/ModalState"
import { connect } from "react-redux"
import OfflineAlert from "~/Component/Alerts/Offline"
import LoginModal from "~/Component/Login/LoginModal"
import CreateNewOfferingModal from "~/Component/Offering/CreateEdit/OfferingFormModal"
import OfferingFinancialFormModal from "~/Component/Offering/Financial/OfferingFinancialFormModal"
import OfferingApprovalFormModal from "~/Component/Offering/Approval/OfferingApprovalFormModal"
import OfferingRequisiteGroupFormModal from "~/Component/Offering/Requisite/RequisiteFormModal"
import AddOfferingFromRequisiteGroupModal from "~/Component/Offering/Requisite/AddOfferingFromRequisiteGroupModal"
import SectionCopyModal from "~/Component/Section/Copy/SectionCopyModal"
import SectionSeatGroupFormModal from "~/Component/Section/SeatGroup/SectionSeatGroupFormModal"
import SeatGroupAffiliatedOrganization from "~/Component/Section/SeatGroup/SeatGroupAffiliatedOrganizationModal"
import ScheduleFormModal from "~/Component/Section/Schedule/ScheduleFormModal"
import ScheduleLocationFromModal from "~/Component/Section/Schedule/ScheduleLocationFormModal"
import ScheduleInstructorFromModal from "~/Component/Section/Schedule/ScheduleInstructorFormModal"
import AddProgramModal from "~/Component/Program/AddProgramModal"
import BudgetFormModal from "~/Component/Section/Budget/BudgetFormModal"
import BudgetEditFormModal from "~/Component/Section/Budget/BudgetEditFormModal"
import DiscountFomrModal from "~/Component/Section/Discount/DiscountFormModal"
import DiscountEditFormModal from "~/Component/Section/Discount/DiscountEditFormModal"
import QuestionCreateModal from "~/Component/Question/Create/QuestionCreateModal"
import QuestionFindModal from "~/Component/Question/Search/QuestionFindModal"
import NoticeEditFormModal from "~/Component/Section/Notice/NoticeEditFormModal"
import ViewResponseModal from "~/Component/Section/Request/ViewResponseModal"

import { REQUEST_RESOLUTION_NAMES } from "~/utils/Constants"
import AnswerQuestionsModal from "~/Component/Section/Request/Resolutions/AnswerQuestionsModal"
import EditBlockerModal from "~/Component/Section/Request/Resolutions/EditBlockerModal"
import PostPaymentModal from "~/Component/Section/Request/Resolutions/PostPaymentModal"
import SpecifyRecipientModal from "~/Component/Section/Request/Resolutions/SpecifyRecipientModal"
import StudentFinderModal from "~/Component/Student/StudentFinderModal"
import ErrorDetailsModal from "~/Component/Section/Request/Resolutions/ErrorDetailsModal"
import CommentCreateModal from "~/Component/Section/Comment/CommentCreateModal"
import AddContactModal from "~/Component/Student/AddContactModal"
import ScheduleNoteFormModal from "~/Component/Section/Schedule/ScheduleNoteFormModal"

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
      {/* {modalState.createSectionModal.value && <SectionFormModal />} */}
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
      {modalState.questionCreateModal.value && <QuestionCreateModal />}
      {modalState.questionFindModal.value && <QuestionFindModal />}
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
