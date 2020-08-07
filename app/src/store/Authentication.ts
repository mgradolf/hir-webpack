const SET_REDIRECT_TO_LOGIN = "SET_REDIRECT_TO_LOGIN"
const SET_LOGIN_REQUIRED = "SET_LOGIN_REQUIRED"

interface IAction {
  type: string
  payload: boolean
}

export interface IAuthentication {
  redirectToLogin: boolean
  loginModalRequired: boolean
}

const INITIAL_PROFILE_STATE: IAuthentication = {
  redirectToLogin: false,
  loginModalRequired: false
}

export const setRedirectToLogin = (value: boolean): IAction => ({
  type: SET_REDIRECT_TO_LOGIN,
  payload: value
})

export const setLoginRequired = (value: boolean): IAction => ({
  type: SET_LOGIN_REQUIRED,
  payload: value
})

export const authenticationReducer = (
  state: IAuthentication = INITIAL_PROFILE_STATE,
  action: IAction
): IAuthentication => {
  switch (action.type) {
    case SET_REDIRECT_TO_LOGIN:
      return { ...state, redirectToLogin: action.payload }
    case SET_LOGIN_REQUIRED:
      return { ...state, loginModalRequired: action.payload }
    default:
      return state
  }
}
