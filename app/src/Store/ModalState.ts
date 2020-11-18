import { IRoom } from "~/Component/Section/RoomFinder/RoomFinderModal"
import { IStudent } from "~/Component/Student/StudentFinderModal"

const SHOW_LOGIN_MODAL = "SHOW_LOGIN_MODAL"
const SHOW_CREATE_OFFERING_MODAL = "SHOW_CREATE_OFFERING_MODAL"
const SHOW_CREATE_OFFERING_FINANCIAL_MODAL = "SHOW_CREATE_OFFERING_FINANCIAL_MODAL"
const SHOW_OFFERING_APPROVAL_MODAL = "SHOW_OFFERING_APPROVAL_MODAL"
const SHOW_OFFERING_PREREQUISITE_GROUP_MODAL = "SHOW_OFFERING_PREREQUISITE_GROUP_MODAL"
const SHOW_ADD_INSTRUCTOR_FROM_INSTRUCTOR_MODAL = "SHOW_ADD_INSTRUCTOR_FROM_INSTRUCTOR_MODAL"
const SHOW_ADD_OFFERING_FROM_PREREQUISITE_GROUP_MODAL = "SHOW_ADD_OFFERING_FROM_PREREQUISITE_GROUP_MODAL"
const SHOW_CREATE_SECTION_MODAL = "SHOW_CREATE_SECTION_MODAL"
const SHOW_SECTION_COPY_MODAL = "SHOW_SECTION_COPY_MODAL"
const SHOW_SECTION_SEATGROUP_MODAL = "SHOW_SECTION_SEATGROUP_MODAL"
const SHOW_SECTION_SEATGROUP_AFFILIATE_ORGANIZATION_MODAL = "SHOW_SECTION_SEATGROUP_AFFILIATE_ORGANIZATION_MODAL"
const SHOW_SECTION_SCHEDULE_MODAL = "SHOW_SECTION_SCHEDULE_MODAL"
const SHOW_SECTION_SCHEDULE_UPDATE_MODAL = "SHOW_SECTION_SCHEDULE_UPDATE_MODAL"
const SHOW_UPDATE_SECTION_SCHEDULE_LOCATION_MODAL = "SHOW_UPDATE_SECTION_SCHEDULE_LOCATION_MODAL"
const SHOW_UPDATE_SECTION_SCHEDULE_INSTRUCTOR_MODAL = "SHOW_UPDATE_SECTION_SCHEDULE_INSTRUCTOR_MODAL"
const SHOW_UPDATE_SECTION_SCHEDULE_NOTE_MODAL = "SHOW_UPDATE_SECTION_SCHEDULE_NOTE_MODAL"
const SHOW_ADD_PROGRAM_MODAL = "SHOW_ADD_PROGRAM_MODAL"
const SHOW_CREATE_BUDGET_MODAL = "SHOW_CREATE_BUDGET_MODAL"
const SHOW_UPDATE_BUDGET_MODAL = "SHOW_UPDATE_BUDGET_MODAL"
const SHOW_CREATE_DISCOUNT_MODAL = "SHOW_CREATE_DISCOUNT_MODAL"
const SHOW_UPDATE_DISCOUNT_MODAL = "SHOW_UPDATE_DISCOUNT_MODAL"
const SHOW_QUESTION_CREATE_MODAL = "SHOW_QUESTION_CREATE_MODAL"
const SHOW_QUESTION_FIND_MODAL = "SHOW_QUESTION_FIND_MODAL"
const SHOW_ROOM_FINDER_MODAL = "SHOW_ROOM_FINDER_MODAL"
const SHOW_STUDENT_FINDER_MODAL = "SHOW_STUDENT_FINDER_MODAL"
const SHOW_UPDATE_NOTICE_MODAL = "SHOW_UPDATE_NOTICE_MODAL"
const SHOW_PERSON_LOOKUP_MODAL = "SHOW_PERSON_LOOKUP_MODAL"
const SHOW_ADD_SECTION_PRODUCT_MODAL = "SHOW_ADD_SECTION_PRODUCT_MODAL"
const SHOW_REQUEST_DETAILS_MODAL = "SHOW_REQUEST_DETAILS_MODAL"
const SHOW_REQUEST_VIEW_RESPONSE_MODAL = "SHOW_REQUEST_VIEW_RESPONSE_MODAL"
const SHOW_REQUEST_RESOLUTION_MODAL = "SHOW_REQUEST_RESOLUTION_MODAL"
const SHOW_REQUEST_QUESTION_ANSWER_MODAL = "SHOW_REQUEST_QUESTION_ANSWER_MODAL"
const SHOW_SECTION_COMMENT_MODAL = "SHOW_SECTION_COMMENT_MODAL"
const SHOW_ADD_CONTACT_MODAL = "SHOW_ADD_CONTACT_MODAL"

export type ModalConfig = {
  value: boolean
  config?: any
}

interface IAction {
  type: string
  payload: ModalConfig
}

export interface IModalState {
  loginModal: ModalConfig
  createOfferingModal: ModalConfig
  createOfferingFinancialModal: ModalConfig
  offeringApprovalModal: ModalConfig
  offeringPrerequisiteGroupModal: ModalConfig
  addOfferingFromRequisiteGroupModal: ModalConfig
  addInstructorFromInstructorModal: ModalConfig
  createSectionModal: ModalConfig
  copySectionModal: ModalConfig
  createSectionSeatGroupModal: ModalConfig
  addSeatGroupAffiliateOrganization: ModalConfig
  createSectionScheduleModal: ModalConfig
  updateSectionScheduleModal: ModalConfig
  updateSectionScheduleLocationModal: ModalConfig
  updateSectionScheduleInstructorModal: ModalConfig
  updateSectionScheduleNoteModal: ModalConfig
  addProgramModal: ModalConfig
  createBudgetModal: ModalConfig
  updateBudgetModal: ModalConfig
  createDiscountModal: ModalConfig
  updateDiscountModal: ModalConfig
  questionCreateModal: ModalConfig
  questionFindModal: ModalConfig
  roomFinderModal: ModalConfig
  studentFinderModal: ModalConfig
  updateNoticeModal: ModalConfig
  personLookupModal: ModalConfig
  addSectionProductModal: ModalConfig
  requestDetailsModal: ModalConfig
  requestViewResponseModal: ModalConfig
  requestResolutionModal: ModalConfig
  requestQuestionAnswerModal: ModalConfig
  sectionCommentModal: ModalConfig
  addContactModal: ModalConfig
}

const INITIAL_MODAL_STATE: IModalState = {
  loginModal: {
    value: false,
    config: null
  },
  createOfferingModal: {
    value: false,
    config: null
  },
  createOfferingFinancialModal: {
    value: false,
    config: null
  },
  offeringApprovalModal: {
    value: false,
    config: null
  },
  offeringPrerequisiteGroupModal: {
    value: false,
    config: null
  },
  addOfferingFromRequisiteGroupModal: {
    value: false,
    config: null
  },
  addInstructorFromInstructorModal: {
    value: false,
    config: null
  },
  createSectionModal: {
    value: false,
    config: null
  },
  copySectionModal: {
    value: false,
    config: null
  },
  createSectionSeatGroupModal: {
    value: false,
    config: null
  },
  addSeatGroupAffiliateOrganization: {
    value: false,
    config: null
  },
  createSectionScheduleModal: {
    value: false,
    config: null
  },
  updateSectionScheduleModal: {
    value: false,
    config: null
  },
  updateSectionScheduleLocationModal: {
    value: false,
    config: null
  },
  updateSectionScheduleInstructorModal: {
    value: false,
    config: null
  },
  updateSectionScheduleNoteModal: {
    value: false,
    config: null
  },
  addProgramModal: {
    value: false,
    config: null
  },
  questionCreateModal: {
    value: false,
    config: null
  },
  questionFindModal: {
    value: false,
    config: null
  },
  roomFinderModal: {
    value: false,
    config: null
  },
  studentFinderModal: {
    value: false,
    config: null
  },
  createBudgetModal: {
    value: false,
    config: null
  },
  updateBudgetModal: {
    value: false,
    config: null
  },
  createDiscountModal: {
    value: false,
    config: null
  },
  updateDiscountModal: {
    value: false,
    config: null
  },
  updateNoticeModal: {
    value: false,
    config: null
  },
  personLookupModal: {
    value: false,
    config: null
  },
  addSectionProductModal: {
    value: false,
    config: null
  },
  requestDetailsModal: {
    value: false,
    config: null
  },
  requestViewResponseModal: {
    value: false,
    config: null
  },
  requestResolutionModal: {
    value: false,
    config: null
  },
  requestQuestionAnswerModal: {
    value: false,
    config: null
  },
  sectionCommentModal: {
    value: false,
    config: null
  },
  addContactModal: {
    value: false,
    config: null
  }
}

export const showLoginModal = (payload: ModalConfig): IAction => ({
  type: SHOW_LOGIN_MODAL,
  payload
})

export const showCreateOfferingModal = ({ value, config = {} }: ModalConfig): IAction => ({
  type: SHOW_CREATE_OFFERING_MODAL,
  payload: { value, config }
})

type ShowCreateOfferingFinancialModalType = {
  offeringId: number
  financialId?: number
}
export const showCreateOfferingFinancialModal = (
  value: boolean,
  config?: ShowCreateOfferingFinancialModalType
): IAction => ({
  type: SHOW_CREATE_OFFERING_FINANCIAL_MODAL,
  payload: { value, config }
})

type ShowOfferingCommonModalType = {
  offeringId: number
}
export const showOfferingApprovalModal = (value: boolean, config?: ShowOfferingCommonModalType): IAction => ({
  type: SHOW_OFFERING_APPROVAL_MODAL,
  payload: { value, config }
})

type ShowOfferingRequisiteGroupModalType = {
  offeringId: number
  requisiteGroupId?: number
}
export const showCreateOfferingPrerequisiteGroupModal = (
  value: boolean,
  config?: ShowOfferingRequisiteGroupModalType
): IAction => ({
  type: SHOW_OFFERING_PREREQUISITE_GROUP_MODAL,
  payload: { value, config }
})

export const showAddOfferingFromRequisiteGroupModal = (
  value: boolean,
  config?: ShowOfferingRequisiteGroupModalType
): IAction => ({
  type: SHOW_ADD_OFFERING_FROM_PREREQUISITE_GROUP_MODAL,
  payload: { value, config }
})

type ShowOfferingQualifiedInstructorModalType = {
  offeringId: number
  rowData: Array<any>
}

export const showAddInstructorFromOfferingModal = (
  value: boolean,
  config?: ShowOfferingQualifiedInstructorModalType
): IAction => ({
  type: SHOW_ADD_INSTRUCTOR_FROM_INSTRUCTOR_MODAL,
  payload: { value, config }
})

interface IShowCreateSectionModal {
  OfferingID?: number
  SectionID?: number
}

export const showCreateSectionModal = (value: boolean, config?: IShowCreateSectionModal): IAction => ({
  type: SHOW_CREATE_SECTION_MODAL,
  payload: { value, config }
})

interface IShowCopySectionModal {
  SectionID: number
  SectionNumber: string
}
export const showCopySectionModal = (value: boolean, config?: IShowCopySectionModal): IAction => ({
  type: SHOW_SECTION_COPY_MODAL,
  payload: { value, config }
})

type ShowSectionCommonModalType = {
  sectionId: number
  seatgroupId?: number
  programId?: number
  programCode?: string
  isDefault?: boolean
}

export const showCreateSectionSeatGroupModal = (value: boolean, config?: ShowSectionCommonModalType): IAction => ({
  type: SHOW_SECTION_SEATGROUP_MODAL,
  payload: { value, config }
})

type ShowSeatGroupAffiliateModalType = {
  seatgroupId: number
}
export const showSeatGroupAffiliateOrganizationModal = (
  value: boolean,
  config?: ShowSeatGroupAffiliateModalType
): IAction => ({
  type: SHOW_SECTION_SEATGROUP_AFFILIATE_ORGANIZATION_MODAL,
  payload: { value, config }
})

type ShowSectionScheduleCommonModalType = {
  sectionId: number
  scheduleIds?: number
}
export const showCreateSectionScheduleModal = (
  value: boolean,
  config?: ShowSectionScheduleCommonModalType
): IAction => ({
  type: SHOW_SECTION_SCHEDULE_MODAL,
  payload: { value, config }
})

type ShowSectionScheduleUpdateModalType = {
  scheduleIds: any
  sectionId?: number
}
export const showUpdateSectionScheduleModal = (
  value: boolean,
  config?: ShowSectionScheduleUpdateModalType
): IAction => ({
  type: SHOW_SECTION_SCHEDULE_UPDATE_MODAL,
  payload: { value, config }
})
export const showUpdateSectionScheduleLocationModal = (
  value: boolean,
  config?: ShowSectionScheduleUpdateModalType
): IAction => ({
  type: SHOW_UPDATE_SECTION_SCHEDULE_LOCATION_MODAL,
  payload: { value, config }
})
export const showUpdateSectionScheduleInstructorModal = (
  value: boolean,
  config?: ShowSectionScheduleUpdateModalType
): IAction => ({
  type: SHOW_UPDATE_SECTION_SCHEDULE_INSTRUCTOR_MODAL,
  payload: { value, config }
})
export const showUpdateSectionScheduleNoteModal = (
  value: boolean,
  config?: ShowSectionScheduleUpdateModalType
): IAction => ({
  type: SHOW_UPDATE_SECTION_SCHEDULE_NOTE_MODAL,
  payload: { value, config }
})

export const showAddProgramModal = (value: boolean, config = {}): IAction => ({
  type: SHOW_ADD_PROGRAM_MODAL,
  payload: { value, config }
})

interface IQuestionModal {
  SectionID?: number
  EventID?: number
  TagTypeID?: number
  TagID?: number
}
export const showQuestionCreateModal = (value: boolean, config?: IQuestionModal): IAction => ({
  type: SHOW_QUESTION_CREATE_MODAL,
  payload: { value, config }
})

export const showQuestionFindModal = (value: boolean, config?: IQuestionModal): IAction => ({
  type: SHOW_QUESTION_FIND_MODAL,
  payload: { value, config }
})

interface IRoomFinderModal {
  onSelectRoomCallback: (roomInfo: IRoom) => void
}

export const showRoomFinderModal = (value: boolean, config?: IRoomFinderModal): IAction => ({
  type: SHOW_ROOM_FINDER_MODAL,
  payload: { value, config }
})

interface IStudentFinderModal {
  AccountID?: number
  onSelectStudentCallback: (studentInfo: IStudent) => void
}

export const showStudentFinderModal = (value: boolean, config?: IStudentFinderModal): IAction => ({
  type: SHOW_STUDENT_FINDER_MODAL,
  payload: { value, config }
})

interface IShowBudgetModal {
  sectionId?: number
  financialId?: number
  seatGroups?: Array<any>
  sectionFinancialId?: number
}

export const showCreateBudgetModal = (value: boolean, config?: IShowBudgetModal): IAction => ({
  type: SHOW_CREATE_BUDGET_MODAL,
  payload: { value, config }
})

export const showUpdateBudgetModal = (value: boolean, config?: IShowBudgetModal): IAction => ({
  type: SHOW_UPDATE_BUDGET_MODAL,
  payload: { value, config }
})

interface IShowDiscountModal {
  sectionId?: number
  sectionDiscountId?: number
}

export const showCreateDiscountModal = (value: boolean, config?: IShowDiscountModal): IAction => ({
  type: SHOW_CREATE_DISCOUNT_MODAL,
  payload: { value, config }
})

export const showUpdateDiscountModal = (value: boolean, config?: IShowDiscountModal): IAction => ({
  type: SHOW_UPDATE_DISCOUNT_MODAL,
  payload: { value, config }
})

interface IShowNoticeModal {
  sectionId: number
  sectionNoticeTypeId: number
}

export const showUpdateNoticeModal = (value: boolean, config?: IShowNoticeModal): IAction => ({
  type: SHOW_UPDATE_NOTICE_MODAL,
  payload: { value, config }
})

export interface IShowPersonLookupModal {
  type: string
}
export const showPersonLookupModal = (value: boolean, config?: IShowPersonLookupModal): IAction => {
  return {
    type: SHOW_PERSON_LOOKUP_MODAL,
    payload: { value, config }
  }
}

interface IShowSectionProductModal {
  sectionId?: number
}

export const showAddSectionProductModal = (value: boolean, config?: IShowSectionProductModal): IAction => ({
  type: SHOW_ADD_SECTION_PRODUCT_MODAL,
  payload: { value, config }
})

interface IShowRequestModal {
  requestId?: number
  requestJson?: any
  taskJson?: any
  resolutionJson?: any
  initialUpdate?: any
  extraDataSource?: any
}

export const showRequestDetailsModal = (value: boolean, config?: IShowRequestModal): IAction => ({
  type: SHOW_REQUEST_DETAILS_MODAL,
  payload: { value, config }
})

export const showRequestViewResponseModal = (value: boolean, config?: IShowRequestModal): IAction => ({
  type: SHOW_REQUEST_VIEW_RESPONSE_MODAL,
  payload: { value, config }
})

export const showRequestResolutionModal = (value: boolean, config?: IShowRequestModal): IAction => ({
  type: SHOW_REQUEST_RESOLUTION_MODAL,
  payload: { value, config }
})

export const showRequestQuestionAnswerModal = (value: boolean, config?: IShowRequestModal): IAction => ({
  type: SHOW_REQUEST_QUESTION_ANSWER_MODAL,
  payload: { value, config }
})

interface ISectionCommentModal {
  SectionID: number
}
export const showSectionCommmentModal = (value: boolean, config?: ISectionCommentModal): IAction => ({
  type: SHOW_SECTION_COMMENT_MODAL,
  payload: { value, config }
})

interface IShowAddContactModal {
  AccountID?: number
}

export const showAddContactModal = (value: boolean, config?: IShowAddContactModal): IAction => ({
  type: SHOW_ADD_CONTACT_MODAL,
  payload: { value, config }
})

export const modalStateReducer = (state: IModalState = INITIAL_MODAL_STATE, action: IAction): IModalState => {
  switch (action.type) {
    case SHOW_LOGIN_MODAL:
      return { ...state, loginModal: action.payload }
    case SHOW_CREATE_OFFERING_MODAL:
      return { ...state, createOfferingModal: action.payload }
    case SHOW_CREATE_OFFERING_FINANCIAL_MODAL:
      return { ...state, createOfferingFinancialModal: action.payload }
    case SHOW_OFFERING_APPROVAL_MODAL:
      return { ...state, offeringApprovalModal: action.payload }
    case SHOW_OFFERING_PREREQUISITE_GROUP_MODAL:
      return { ...state, offeringPrerequisiteGroupModal: action.payload }
    case SHOW_ADD_OFFERING_FROM_PREREQUISITE_GROUP_MODAL:
      return { ...state, addOfferingFromRequisiteGroupModal: action.payload }
    case SHOW_ADD_INSTRUCTOR_FROM_INSTRUCTOR_MODAL:
      return { ...state, addInstructorFromInstructorModal: action.payload }
    case SHOW_CREATE_SECTION_MODAL:
      return { ...state, createSectionModal: action.payload }
    case SHOW_SECTION_COPY_MODAL:
      return { ...state, copySectionModal: action.payload }
    case SHOW_SECTION_SEATGROUP_MODAL:
      return { ...state, createSectionSeatGroupModal: action.payload }
    case SHOW_SECTION_SEATGROUP_AFFILIATE_ORGANIZATION_MODAL:
      return { ...state, addSeatGroupAffiliateOrganization: action.payload }
    case SHOW_SECTION_SCHEDULE_MODAL:
      return { ...state, createSectionScheduleModal: action.payload }
    case SHOW_SECTION_SCHEDULE_UPDATE_MODAL:
      return { ...state, updateSectionScheduleModal: action.payload }
    case SHOW_UPDATE_SECTION_SCHEDULE_LOCATION_MODAL:
      return { ...state, updateSectionScheduleLocationModal: action.payload }
    case SHOW_UPDATE_SECTION_SCHEDULE_INSTRUCTOR_MODAL:
      return { ...state, updateSectionScheduleInstructorModal: action.payload }
    case SHOW_UPDATE_SECTION_SCHEDULE_NOTE_MODAL:
      return { ...state, updateSectionScheduleNoteModal: action.payload }
    case SHOW_ADD_PROGRAM_MODAL:
      return { ...state, addProgramModal: action.payload }
    case SHOW_CREATE_BUDGET_MODAL:
      return { ...state, createBudgetModal: action.payload }
    case SHOW_UPDATE_BUDGET_MODAL:
      return { ...state, updateBudgetModal: action.payload }
    case SHOW_CREATE_DISCOUNT_MODAL:
      return { ...state, createDiscountModal: action.payload }
    case SHOW_UPDATE_DISCOUNT_MODAL:
      return { ...state, updateDiscountModal: action.payload }
    case SHOW_QUESTION_CREATE_MODAL:
      return { ...state, questionCreateModal: action.payload }
    case SHOW_QUESTION_FIND_MODAL:
      return { ...state, questionFindModal: action.payload }
    case SHOW_ROOM_FINDER_MODAL:
      return { ...state, roomFinderModal: action.payload }
    case SHOW_STUDENT_FINDER_MODAL:
      return { ...state, studentFinderModal: action.payload }
    case SHOW_UPDATE_NOTICE_MODAL:
      return { ...state, updateNoticeModal: action.payload }
    case SHOW_PERSON_LOOKUP_MODAL:
      return { ...state, personLookupModal: action.payload }
    case SHOW_ADD_SECTION_PRODUCT_MODAL:
      return { ...state, addSectionProductModal: action.payload }
    case SHOW_REQUEST_DETAILS_MODAL:
      return { ...state, requestDetailsModal: action.payload }
    case SHOW_REQUEST_VIEW_RESPONSE_MODAL:
      return { ...state, requestViewResponseModal: action.payload }
    case SHOW_REQUEST_RESOLUTION_MODAL:
      return { ...state, requestResolutionModal: action.payload }
    case SHOW_REQUEST_QUESTION_ANSWER_MODAL:
      return { ...state, requestQuestionAnswerModal: action.payload }
    case SHOW_SECTION_COMMENT_MODAL:
      return { ...state, sectionCommentModal: action.payload }
    case SHOW_ADD_CONTACT_MODAL:
      return { ...state, addContactModal: action.payload }
    default:
      return state
  }
}
