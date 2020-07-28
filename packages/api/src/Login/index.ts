import callApi from '../utils/CallApi'
import { setTokens } from '../utils/TokenStore'
import { ApiConfig } from '../utils/Interfaces'

export async function login(
  UserName: string,
  UserPassword: string
): Promise<any> {
  const requestConfig: ApiConfig = {
    url: 'api/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: { UserName, UserPassword }
  }

  const [response, error] = await callApi(requestConfig, undefined, undefined)
  setTokens(response.data['access_token'])
  return response
}
