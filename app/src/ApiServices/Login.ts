import { login as loginService } from "@packages/api/lib/Login"
import { store } from "~/store"
import { setRedirectToLogin } from "~/store/Authentication"
import { showLoginModal } from "~/store/ModalState"
import { removeTokens, getToken } from "@packages/api/lib/utils/TokenStore"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

// type LoginResponse = { data: { token: string } } // TODO: More to define here, as we only know token for now
// type Response<T> = [T | undefined, unknown | undefined] // TODO: should be exported from somewhere more generic

export async function login(UserName: string, UserPassword: string): Promise<IApiResponse> {
  const response = await loginService(UserName, UserPassword)
  if (response && response.success) {
    store.dispatch(showLoginModal({ value: false }))
    store.dispatch(setRedirectToLogin(false))
  }
  return response
}

export function logout(): void {
  removeTokens()
  store.dispatch(showLoginModal({ value: false }))
  store.dispatch(setRedirectToLogin(true))
}

export function initializedAuthState(): void {
  if (!getToken()) {
    store.dispatch(showLoginModal({ value: false }))
    store.dispatch(setRedirectToLogin(true))
  }
}
