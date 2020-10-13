import { TYPE_MODAL_NAME } from "~/Store/ModalState2/ModalNames"

interface IModalState {
  modalName?: TYPE_MODAL_NAME
  isOpen: boolean
  options?: any
}

export interface IModalStates {
  defaultModal?: IModalState
  modalLevel1?: IModalState
  modalLevel2?: IModalState
  modalLevel3?: IModalState
}

const INITIAL_MODAL_STATE: IModalStates = {}

interface IAction {
  isOpen: boolean
  modalName: TYPE_MODAL_NAME
  options?: any
}

export const openModal = (modalName: TYPE_MODAL_NAME, options?: any): IAction => ({
  isOpen: true,
  modalName,
  options
})

export const closeModal = (modalName: TYPE_MODAL_NAME): IAction => ({
  modalName,
  isOpen: false
})

export const modalState2Reducer = (state: IModalStates = INITIAL_MODAL_STATE, action?: IAction): IModalStates => {
  if (action && action.modalName) {
    const params: IModalState = {
      isOpen: action.isOpen,
      modalName: action.modalName,
      options: action.options
    }
    return { ...state, [action.modalName]: params }
  }
  return state
}
