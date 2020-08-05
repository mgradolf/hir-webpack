import { login } from '@packages/api/lib/Login'

type LoginResponse = { token: string } // TODO: More to define here, as we only know token for now
type Response<T> = [T | undefined, unknown | undefined] // TODO: should be exported from somewhere more generic

export function loginWrapper(
  UserName: string,
  UserPassword: string
): Promise<Response<LoginResponse>> {
  return login(UserName, UserPassword)
}
