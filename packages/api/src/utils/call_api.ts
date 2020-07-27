import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { ApiConfig } from './api_config_model'
// import { getToken } from "./token_manage"

interface ErrorSchema {
  status: number | undefined
  error: any
  data: any
}
const handleError = (error: AxiosError): ErrorSchema => {
  let errResponse: ErrorSchema = {
    status: undefined,
    error: undefined,
    data: undefined
  }
  console.log(error)
  if (error.isAxiosError && error && error.response) {
    if (error.response.data && typeof error.response.data !== 'string') {
      errResponse = {
        status: error.response.data['code'],
        error: error.response.data['error'],
        data: error.response.data['data']
      }
    } else {
      errResponse = {
        status: error.response.status,
        error: error.response.data,
        data: null
      }
    }
  }
  return errResponse
}

const handle = (promise: Promise<any>): Promise<any> => {
  return promise
    .then((response: AxiosResponse<any>) => [<any>response.data, undefined])
    .catch((error: AxiosError) =>
      Promise.resolve([undefined, <any>handleError(error)])
    )
}

export default async function callApi(
  apiConfig: ApiConfig,
  Service: undefined | string,
  Params: undefined | any
): Promise<[any, any]> {
  const requestConfig: AxiosRequestConfig = <AxiosRequestConfig>apiConfig

  if (requestConfig.data || Service || Params) {
    requestConfig.data = {
      ...requestConfig.data,
      Service,
      Params
    }
  }
  requestConfig.baseURL = process.env.REACT_APP_API_ROOT
  const [response, error] = await handle(axios.request(requestConfig))
  return [response, error]
}
