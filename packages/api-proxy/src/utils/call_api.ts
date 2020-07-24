import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { config } from './api_config_model'
import { getToken } from './token_manage'

const handle = (promise: Promise<any>): Promise<any> => {
  return promise
    .then((response: AxiosResponse<any>) => [<any>response.data, undefined])
    .catch((error: AxiosError) => Promise.resolve([undefined, <any>error]))
}

export default async function callApi(params: config): Promise<[any, any]> {
  const requestConfig: AxiosRequestConfig = <AxiosRequestConfig>params
  requestConfig.baseURL = process.env.REACT_APP_API_ROOT
  const [response, error] = await handle(axios.request(requestConfig))
  return [response, error]
}
