import { Dispatch } from 'redux'
import { loginWrapper } from '~/api-wrappers/Login'

export const AUTHENTICATION_PROGRESS = 'AUTHENTICATION_PROGRESS'
export const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS'
export const AUTHENTICATION_FAIL = 'AUTHENTICATION_FAIL'

interface IAuthenticationProgress {
  type: typeof AUTHENTICATION_PROGRESS
}

interface IAuthSuccessAction {
  type: typeof AUTHENTICATION_SUCCESS
  payload: {
    token: string
  }
}

interface IAuthFailAction {
  type: typeof AUTHENTICATION_FAIL
  payload: {
    error: { error: string }
  }
}

export type IAuthAction =
  | IAuthenticationProgress
  | IAuthSuccessAction
  | IAuthFailAction

export function authenticate(username: string, password: string) {
  return async (dispatch: Dispatch<IAuthAction>) => {
    dispatch(authenticationProgress())

    try {
      const [result] = await loginWrapper(username, password)

      if (result !== undefined) {
        dispatch(authenticationSuccess(result.access_token))
      }
    } catch ([_, error]) {
      if (error !== undefined) {
        dispatch(authenticationFail(error))
      }
    } finally {
      // no-op
    }
  }
}

export function authenticationProgress(): IAuthenticationProgress {
  return {
    type: AUTHENTICATION_PROGRESS
  }
}

export function authenticationSuccess(token: string): IAuthSuccessAction {
  return {
    type: AUTHENTICATION_SUCCESS,
    payload: { token }
  }
}

export function authenticationFail(error: any): IAuthFailAction {
  return {
    type: AUTHENTICATION_FAIL,
    payload: { error }
  }
}
