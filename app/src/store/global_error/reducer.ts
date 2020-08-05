import {
  SHOW_GLOBAL_API_ERROR,
  REMOVE_GLOBAL_API_ERROR
} from '~/store/action_types'

interface IAction {
  type: string
  payload: any
}

export interface IGlobalApiErrorState {
  errorMessage: null | string
}

export const globalApiErrorReducer = (
  state: IGlobalApiErrorState = { errorMessage: null },
  action: IAction
): IGlobalApiErrorState => {
  switch (action.type) {
    case SHOW_GLOBAL_API_ERROR:
      return { errorMessage: action.payload.message }
    case REMOVE_GLOBAL_API_ERROR:
    default:
      return { errorMessage: null }
  }
}
