import { ErrorSchema, ErrorType } from "../Interfaces"
import { AxiosError, AxiosResponse } from "axios"

const handleError = (error: AxiosError): ErrorSchema => {
  let errResponse: ErrorSchema = {
    code: undefined,
    error: "Unknown",
    data: undefined,
    success: false
  }
  if (error.isAxiosError && error && error.response) {
    if (error.response.data && typeof error.response.data !== "string") {
      errResponse = {
        code: error.response.data["code"],
        error: error.response.data["error"],
        data: error.response.data["data"],
        success: error.response.data["success"]
      }
    } else {
      errResponse = {
        code: error.response.status,
        error: error.response.data,
        data: null,
        success: false
      }
    }
  }
  errResponse = tagGlobalErrors(errResponse)
  return errResponse
}

const retireveErrorText = (errResponse: ErrorSchema, defaultMessage: string): string => {
  if (errResponse.error && errResponse.error.Description) {
    return errResponse.error.Description
  } else if (errResponse.error && typeof errResponse.error === "string") {
    return errResponse.error
  }
  return defaultMessage
}

const tagGlobalErrors = (errResponse: ErrorSchema) => {
  switch (errResponse.code) {
    case 401:
      errResponse.type = ErrorType.GLOBAL
      errResponse.error = retireveErrorText(errResponse, "UnAuthorized")
      break
    case 403:
      errResponse.type = ErrorType.GLOBAL
      errResponse.error = retireveErrorText(errResponse, "Forbidden")
      break
    case 500:
      errResponse.type = ErrorType.GLOBAL
      errResponse.error = retireveErrorText(errResponse, "Internal Server Error")
      break
    case 502:
      errResponse.type = ErrorType.GLOBAL
      errResponse.error = retireveErrorText(errResponse, "Bad Gateway")
      break
    case 503:
      errResponse.type = ErrorType.GLOBAL
      errResponse.error = retireveErrorText(errResponse, "Service Unavailable")
      break
    case 504:
      errResponse.type = ErrorType.GLOBAL
      errResponse.error = retireveErrorText(errResponse, "Gateway Timeout")
      break
    default:
      errResponse.type = ErrorType.CUSTOM
      break
  }
  return errResponse
}

export const handleResponse = (promise: Promise<any>): Promise<any> => {
  return promise
    .then((response: AxiosResponse<any>) => {
      return [<any>response.data, undefined]
    })
    .catch((error: AxiosError) => Promise.resolve([undefined, <any>handleError(error)]))
}
