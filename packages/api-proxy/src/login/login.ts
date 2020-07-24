import { AxiosRequestConfig } from 'axios'
import callApi from '../utils/call_api'
import { setTokens } from '../utils/token_manage'
import { config } from '../utils/api_config_model'

export async function login(
  UserName: string,
  UserPassword: string
): Promise<any> {
  const requestConfig: config = {
    url: 'api/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: { UserName, UserPassword }
  }

  const [response, error] = await callApi(requestConfig)
  setTokens(response.data['access_token'])
  return response
}
