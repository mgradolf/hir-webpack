import { IApiResponse, ErrorType } from "../Interfaces"
import { AxiosError, AxiosResponse } from "axios"
import processedError from "./ProcessError"

const handleError = (error: AxiosError): IApiResponse => {
  let response: IApiResponse = {
    code: undefined,
    error: undefined,
    data: undefined,
    success: false,
    errorMessage: ""
  }
  if (error.isAxiosError && error && error.response) {
    if (error.response.data && typeof error.response.data !== "string") {
      response = {
        code: error.response.data["code"],
        error: error.response.data["error"],
        data: error.response.data["data"],
        success: error.response.data["success"]
      }
    } else {
      response = {
        code: error.response.status,
        error: error.response.data,
        data: null,
        success: false
      }
    }
  } else {
    response.code = 503
  }
  response = tagGlobalErrors(response)
  response = processedError(response)
  return response
}

const retireveErrorText = (response: IApiResponse, defaultMessage: string): string => {
  if (response.error && response.error.Description) {
    return response.error.Description
  } else if (response.error && typeof response.error === "string") {
    return response.error
  }
  return defaultMessage
}

const tagGlobalErrors = (response: IApiResponse) => {
  switch (response.code) {
    case 401:
      response.type = ErrorType.GLOBAL
      response.errorMessage = retireveErrorText(response, "UnAuthorized")
      break
    case 403:
      response.type = ErrorType.GLOBAL
      response.errorMessage = retireveErrorText(response, "Forbidden")
      break
    case 404:
      response.type = ErrorType.GLOBAL
      response.errorMessage = retireveErrorText(response, "Resource not found")
      break
    case 500:
      response.type = ErrorType.GLOBAL
      response.errorMessage = retireveErrorText(response, "Internal Server Error")
      break
    case 502:
      response.type = ErrorType.GLOBAL
      response.errorMessage = retireveErrorText(response, "Bad Gateway")
      break
    case 503:
      response.type = ErrorType.GLOBAL
      response.errorMessage = retireveErrorText(response, "Service Unavailable")
      break
    case 504:
      response.type = ErrorType.GLOBAL
      response.errorMessage = retireveErrorText(response, "Gateway Timeout")
      break
    default:
      response.type = ErrorType.CUSTOM
      break
  }
  return response
}

export const handleResponse = (promise: Promise<any>): Promise<IApiResponse> => {
  return promise
    .then((response: AxiosResponse<any>) => {
      let result = <IApiResponse>response.data
      if (
        result.code === 200 &&
        ((Array.isArray(result.data) && result.data.length === 0) || result.data === "" || !result.data)
      ) {
        result.code = 404
        result = tagGlobalErrors(result)
        result = processedError(result)
      }
      return result
    })
    .catch((error: AxiosError) => Promise.resolve(handleError(error)))
}
