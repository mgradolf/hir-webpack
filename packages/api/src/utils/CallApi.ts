import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { ApiConfig, ErrorSchema, ErrorType } from './Interfaces'
import eventBus from './GlobalHttpErrorEventBus'

const handleError = (error: AxiosError): ErrorSchema => {
  console.log('handle error ', error)

  let errResponse: ErrorSchema = {
    status: undefined,
    error: 'Unknown',
    data: undefined
  }
  if (error.isAxiosError && error && error.response) {
    if (
      error.response.data &&
      typeof error.response.data !== 'string' &&
      error.response.data['code'] &&
      error.response.data['error'] &&
      error.response.data['data']
    ) {
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
  return tagErrors(errResponse)
}

const handle = (promise: Promise<any>): Promise<any> => {
  return promise
    .then((response: AxiosResponse<any>) => [<any>response.data, undefined])
    .catch((error: AxiosError) =>
      Promise.resolve([undefined, <any>handleError(error)])
    )
}

const tagErrors = (errResponse: ErrorSchema) => {
  switch (errResponse.status) {
    case 401:
      errResponse.type = ErrorType.GLOBAL
      errResponse.error = 'Unauthorized'
      break
    case 403:
      errResponse.type = ErrorType.GLOBAL
      errResponse.error = 'Forbidden'
      break
    case 500:
      errResponse.type = ErrorType.GLOBAL
      errResponse.error = 'Internal Server Error'
      break
    case 502:
      errResponse.type = ErrorType.GLOBAL
      errResponse.error = 'Bad Gateway'
      break
    case 503:
      errResponse.type = ErrorType.GLOBAL
      errResponse.error = 'Service Unavailable'
      break
    case 504:
      errResponse.type = ErrorType.GLOBAL
      errResponse.error = 'Gateway Timeout'
      break
    default:
      errResponse.type = ErrorType.CUSTOM
      break
  }
  return errResponse
}

export default async function callApi(config: ApiConfig): Promise<[any, any]> {
  const requestConfig: AxiosRequestConfig = <AxiosRequestConfig>config
  const [response, error] = await handle(axios.request(requestConfig))
  console.log('typeof requestConfig ', typeof requestConfig)
  console.log('requestConfig', requestConfig)
  console.log('response ', response)

  if (error.type === ErrorType.GLOBAL) {
    eventBus.publish(error)
    return [undefined, undefined]
  }
  return [response, error]
}
