const SHOW_GLOBAL_API_ERROR = "SHOW_GLOBAL_ERROR"
const REMOVE_GLOBAL_API_ERROR = "REMOVE_GLOBAL_ERROR"

interface IAction {
  type: string
  payload?: any
}

export interface IGlobalApiErrorState {
  errorMessage: null | string
}

export const showGLobalApiError = (message: string | null): IAction => ({
  type: SHOW_GLOBAL_API_ERROR,
  payload: { message }
})

export const removeGLobalApiError = (): IAction => ({
  type: REMOVE_GLOBAL_API_ERROR
})

export const globalApiErrorReducer = (
  state: IGlobalApiErrorState = { errorMessage: null },
  action: IAction
): IGlobalApiErrorState => {
  switch (action.type) {
    case SHOW_GLOBAL_API_ERROR:
      return { errorMessage: action.payload.message }
    case REMOVE_GLOBAL_API_ERROR:
      return { errorMessage: null }
    default:
      return state
  }
}
