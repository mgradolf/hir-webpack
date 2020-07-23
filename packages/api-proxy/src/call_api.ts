import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { getToken } from './token_manage'
import { getNewAccessToken } from './get_refresh_token'

const handle = (promise: Promise<any>): Promise<any> => {
  return promise
    .then((data: AxiosResponse<any>) => [data, undefined])
    .catch((error: AxiosError) => Promise.resolve([undefined, error]))
}

export default async function callApi(
  requestConfig: AxiosRequestConfig
): Promise<AxiosResponse> {
  requestConfig.baseURL = process.env.REACT_APP_API_ROOT
  requestConfig.headers['Authorization'] = `Bearer ${getToken()}`

  const [firstResponse, firstError] = await handle(axios.request(requestConfig))

  if (firstError.code === 401) {
    const newToken = getNewAccessToken()
    requestConfig.headers['Authorization'] = `Bearer ${newToken}`
    const [secondResponse, secondError] = await handle(
      axios.request(requestConfig)
    )
    if (secondError) return secondError
    return secondResponse
  } else if (firstError) {
    return firstError
  }

  return firstResponse
}
