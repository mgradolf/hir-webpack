const SET_REDIRECT_TO_LOGIN = "SET_REDIRECT_TO_LOGIN"
const SET_USER_PERMISSION = "SET_USER_PERMISSION"

interface IAction {
  type: string
  payload: any
}

export interface IToken {
  token: string
}

export interface IUserPermissions {
  disabilities: boolean
  make_payment: boolean
  issue_credit: boolean
  registration_in_course: boolean
  create_offering: boolean
  creation_section: boolean
  update_offering: boolean
}

export interface IAuthentication {
  redirectToLogin: boolean
  permission?: IUserPermissions
}

const INITIAL_AUTH_STATE: IAuthentication = {
  redirectToLogin: false,
  permission: undefined
}

export const setRedirectToLogin = (value: boolean): IAction => ({
  type: SET_REDIRECT_TO_LOGIN,
  payload: value
})

export const setUserPermission = (value?: IUserPermissions): IAction => ({
  type: SET_USER_PERMISSION,
  payload: value
})

export const authenticationReducer = (
  state: IAuthentication = INITIAL_AUTH_STATE,
  action: IAction
): IAuthentication => {
  switch (action.type) {
    case SET_REDIRECT_TO_LOGIN:
      return { ...state, redirectToLogin: action.payload }
    case SET_USER_PERMISSION:
      return { ...state, permission: action.payload }
    default:
      return state
  }
}
