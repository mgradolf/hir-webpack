import * as actions from '~/store/authentication/actions'

export interface IAuthenticationState {
  token: string | null
  loggingIn: boolean
  loginError: string | null
}

const initialState: IAuthenticationState = {
  token: null,
  loggingIn: false,
  loginError: null
}

export const authenticationReducer = (
  state: IAuthenticationState = initialState,
  action: actions.IAuthAction
): IAuthenticationState => {
  switch (action.type) {
    case actions.AUTHENTICATION_PROGRESS:
      return { ...state, loginError: null, loggingIn: true }
    case actions.AUTHENTICATION_SUCCESS:
      const { token } = action.payload
      return { ...state, loggingIn: false, token, loginError: null }
    case actions.AUTHENTICATION_FAIL:
      const { error } = action.payload
      return { ...state, loggingIn: false, loginError: error }
    case actions.DISMISS_AUTH_ERROR:
      return { ...state, loginError: null }
    default:
      return { ...state, ...initialState }
  }
}
