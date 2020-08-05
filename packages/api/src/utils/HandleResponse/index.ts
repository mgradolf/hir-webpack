import { ErrorSchema, ErrorType } from "../Interfaces"
import { AxiosError, AxiosResponse } from "axios"

const handleError = (error: AxiosError): ErrorSchema => {
  console.log("handle error ", error)

  let errResponse: ErrorSchema = {
    status: undefined,
    error: "Unknown",
    data: undefined
  }
  if (error.isAxiosError && error && error.response) {
    if (error.response.data && typeof error.response.data !== "string" && error.response.data["code"] && error.response.data["error"] && error.response.data["data"]) {
      errResponse = {
        status: error.response.data["code"],
        error: error.response.data["error"],
        data: error.response.data["data"]
      }
    } else {
      errResponse = {
        status: error.response.status,
        error: error.response.data,
        data: null
      }
    }
  }
  errResponse = tagGlobalErrors(errResponse)
  return errResponse
}

const tagGlobalErrors = (errResponse: ErrorSchema) => {
  switch (errResponse.status) {
    case 401:
      errResponse.type = ErrorType.GLOBAL
      errResponse.error = "Unauthorized"
      break
    case 403:
      errResponse.type = ErrorType.GLOBAL
      errResponse.error = "Forbidden"
      break
    case 500:
      errResponse.type = ErrorType.GLOBAL
      errResponse.error = "Internal Server Error"
      break
    case 502:
      errResponse.type = ErrorType.GLOBAL
      errResponse.error = "Bad Gateway"
      break
    case 503:
      errResponse.type = ErrorType.GLOBAL
      errResponse.error = "Service Unavailable"
      break
    case 504:
      errResponse.type = ErrorType.GLOBAL
      errResponse.error = "Gateway Timeout"
      break
    default:
      errResponse.type = ErrorType.CUSTOM
      break
  }
  return errResponse
}

export const handleResponse = (promise: Promise<any>): Promise<any> => {
  return promise
    .then((response: AxiosResponse<any>) => [<any>response.data, undefined])
    .catch((error: AxiosError) => Promise.resolve([undefined, <any>handleError(error)]))
}
