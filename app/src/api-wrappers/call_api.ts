import { ErrorType } from '@packages/api/lib/utils/api_interfaces'

export default async function (
  apiMethod: (a?: any) => Promise<[any, any]>,
  Params?: any
): Promise<any> {
  const [response, errResponse] = await apiMethod(Params)
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

  return [response, errResponse]
}
