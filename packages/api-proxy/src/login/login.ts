import { AxiosRequestConfig } from 'axios'
import callApi from '~/utils/call_api'
import { setTokens } from '~/utils/token_manage'
import { convertToFormData } from '~/utils/convert_to_form_data'

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
