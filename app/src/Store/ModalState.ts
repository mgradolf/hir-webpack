import { IRoom } from "~/Component/Section/RoomFinder/RoomFinderModal"

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
const SHOW_QUESTION_CREATE_MODAL = "SHOW_QUESTION_CREATE_MODAL"
const SHOW_QUESTION_FIND_MODAL = "SHOW_QUESTION_FIND_MODAL"
const SHOW_ROOM_FINDER_MODAL = "SHOW_ROOM_FINDER_MODAL"

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
  questionCreateModal: ModalConfig
  questionFindModal: ModalConfig
  roomFinderModal: ModalConfig
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
  createBudgetModal: {
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

interface IShowCreateBudgetModal {
  sectionId?: number
}

export const showCreateBudgetModal = (value: boolean, config?: IShowCreateBudgetModal): IAction => ({
  type: SHOW_CREATE_BUDGET_MODAL,
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
    case SHOW_QUESTION_CREATE_MODAL:
      return { ...state, questionCreateModal: action.payload }
    case SHOW_QUESTION_FIND_MODAL:
      return { ...state, questionFindModal: action.payload }
    case SHOW_ROOM_FINDER_MODAL:
      return { ...state, roomFinderModal: action.payload }
    default:
      return state
  }
}
