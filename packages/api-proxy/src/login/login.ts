import callApi from 'src/call_api'
import { AxiosRequestConfig } from 'axios'
import { convertToFormData } from 'src/utils'
import { setTokens } from 'src/token_manage'

export async function login(
  UserName: string,
  UserPassword: string
): Promise<any> {
  const requestConfig: AxiosRequestConfig = {
    url: 'api/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: convertToFormData({ UserName, UserPassword })
  }

  const response = await callApi(requestConfig)
  setTokens(response.data['access_token'])
  return response
}
