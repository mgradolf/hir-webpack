import { login as loginService } from "@packages/api/lib/Login"
import { store } from "~/Store"
import { setRedirectToLogin } from "~/Store/Authentication"
import { showLoginModal } from "~/Store/ModalState"
import { removeTokens, getToken } from "@packages/api/lib/utils/TokenStore"
import { removeUsername } from "@packages/api/lib/utils/UserInfoStore"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { eventBus } from "~/utils/EventBus"

// type LoginResponse = { data: { token: string } } // TODO: More to define here, as we only know token for now
// type Response<T> = [T | undefined, unknown | undefined] // TODO: should be exported from somewhere more generic

export async function login(UserName: string, UserPassword: string): Promise<IApiResponse> {
  const response = await loginService(UserName, UserPassword)
  if (response && response.success) {
    setTimeout(() => {
      store.dispatch(showLoginModal({ value: false }))
      store.dispatch(setRedirectToLogin(false))
      eventBus.publishSimilarEvents(/REFRESH.*/i)
    }, 0)
  }
  return response
}

export function logout(): void {
  removeTokens()
  removeUsername()
  store.dispatch(showLoginModal({ value: false }))
  store.dispatch(setRedirectToLogin(true))
}

export function initializedAuthState(): void {
  if (!getToken()) {
    store.dispatch(showLoginModal({ value: false }))
    store.dispatch(setRedirectToLogin(true))
  }
}
