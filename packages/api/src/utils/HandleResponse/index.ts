import { ErrorSchema, ErrorType } from "../Interfaces"
import { AxiosError, AxiosResponse } from "axios"

const handleError = (error: AxiosError): ErrorSchema => {
  console.log("handle error ", error.response)

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
  console.log("handle error ", errResponse)
  errResponse = tagGlobalErrors(errResponse)
  return errResponse
}

const tagGlobalErrors = (errResponse: ErrorSchema) => {
  switch (errResponse.code) {
    case 401:
      errResponse.type = ErrorType.GLOBAL
      errResponse.error =
        errResponse.error && errResponse.error.Description ? errResponse.error.Description : "Unauthorized"
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
    .then((response: AxiosResponse<any>) => {
      console.log(response)
      return [<any>response.data, undefined]
    })
    .catch((error: AxiosError) => Promise.resolve([undefined, <any>handleError(error)]))
}
