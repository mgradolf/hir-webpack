const SHOW_LOGIN_MODAL = "SHOW_LOGIN_MODAL"
const SHOW_CREATE_OFFERING_MODAL = "SHOW_CREATE_OFFERING_MODAL"

interface IAction {
  type: string
  payload: boolean
}

export interface IModalState {
  loginModal: boolean
  createOfferingModal: boolean
}

const INITIAL_MODAL_STATE: IModalState = {
  loginModal: false,
  createOfferingModal: false
}

export const showLoginModal = (value: boolean): IAction => ({
  type: SHOW_LOGIN_MODAL,
  payload: value
})

export const showCreateOfferingModal = (value: boolean): IAction => ({
  type: SHOW_CREATE_OFFERING_MODAL,
  payload: value
})

export const modalStateReducer = (state: IModalState = INITIAL_MODAL_STATE, action: IAction): IModalState => {
  switch (action.type) {
    case SHOW_LOGIN_MODAL:
      return { ...state, loginModal: action.payload }
    case SHOW_CREATE_OFFERING_MODAL:
      return { ...state, createOfferingModal: action.payload }
    default:
      return state
  }
}
