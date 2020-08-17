import { login as loginService } from "@packages/api/lib/Login"
import { store } from "~/store"
import { setRedirectToLogin } from "~/store/Authentication"
import { showLoginModal } from "~/store/ModalState"
import { removeTokens, getToken } from "@packages/api/lib/utils/TokenStore"

// type LoginResponse = { data: { token: string } } // TODO: More to define here, as we only know token for now
// type Response<T> = [T | undefined, unknown | undefined] // TODO: should be exported from somewhere more generic

export async function login(UserName: string, UserPassword: string): Promise<[any, any]> {
  const [response, error] = await loginService(UserName, UserPassword)
  if (response) {
    store.dispatch(showLoginModal(false))
    store.dispatch(setRedirectToLogin(false))
  }
  return [response, error]
}

export function logout(): void {
  removeTokens()
  store.dispatch(showLoginModal(false))
  store.dispatch(setRedirectToLogin(true))
}

export function initializedAuthState(): void {
  if (!getToken()) {
    store.dispatch(showLoginModal(false))
    store.dispatch(setRedirectToLogin(true))
  }
}
