const SHOW_LOGIN_MODAL = "SHOW_LOGIN_MODAL"
const SHOW_CREATE_OFFERING_MODAL = "SHOW_CREATE_OFFERING_MODAL"
const SHOW_CREATE_OFFERING_FINANCIAL_MODAL = "SHOW_CREATE_OFFERING_FINANCIAL_MODAL"
const SHOW_OFFERING_APPROVAL_MODAL = "SHOW_OFFERING_APPROVAL_MODAL"
const SHOW_OFFERING_PREREQUISITE_GROUP_MODAL = "SHOW_OFFERING_PREREQUISITE_GROUP_MODAL"

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
    default:
      return state
  }
}
