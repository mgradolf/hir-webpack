const SET_REDIRECT_TO_LOGIN = "SET_REDIRECT_TO_LOGIN"

interface IAction {
  type: string
  payload: boolean
}

export interface IAuthentication {
  redirectToLogin: boolean
}

const INITIAL_AUTH_STATE: IAuthentication = {
  redirectToLogin: false
}

export const setRedirectToLogin = (value: boolean): IAction => ({
  type: SET_REDIRECT_TO_LOGIN,
  payload: value
})

export const authenticationReducer = (
  state: IAuthentication = INITIAL_AUTH_STATE,
  action: IAction
): IAuthentication => {
  switch (action.type) {
    case SET_REDIRECT_TO_LOGIN:
      return { ...state, redirectToLogin: action.payload }
    default:
      return state
  }
}
