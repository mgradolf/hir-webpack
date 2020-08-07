import { login as loginService } from "@packages/api/lib/Login"
import { store } from "~/store"
import { setLoginRequired, setRedirectToLogin } from "~/store/Authentication"
import { removeTokens, getToken } from "@packages/api/lib/utils/TokenStore"

// type LoginResponse = { data: { token: string } } // TODO: More to define here, as we only know token for now
// type Response<T> = [T | undefined, unknown | undefined] // TODO: should be exported from somewhere more generic

export async function login(UserName: string, UserPassword: string): Promise<[any, any]> {
  const [response, error] = await loginService(UserName, UserPassword)
  if (response) {
    store.dispatch(setLoginRequired(false))
    store.dispatch(setRedirectToLogin(false))
  }
  return [response, error]
}

export function logout(): void {
  removeTokens()
  store.dispatch(setRedirectToLogin(true))
  store.dispatch(setLoginRequired(true))
}

export function initializedAuthState(): void {
  if (!getToken()) {
    store.dispatch(setLoginRequired(true))
    store.dispatch(setRedirectToLogin(true))
  }
}
