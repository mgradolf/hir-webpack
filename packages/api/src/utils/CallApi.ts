import axios, { AxiosRequestConfig } from "axios"
import { ApiConfig, ErrorType, IApiResponse } from "./Interfaces"
import { handleResponse } from "./HandleResponse"
import apiErroreEventBus from "./GlobalHttpErrorEventBus"

export default async function callApi(config: ApiConfig): Promise<IApiResponse> {
  const requestConfig: AxiosRequestConfig = <AxiosRequestConfig>config
  requestConfig.withCredentials = true
  apiErroreEventBus.publish(null)

  const response: IApiResponse = await handleResponse(axios.request(requestConfig))
  // console.log("requestConfig", requestConfig)
  // console.log("response ", response)
  // console.log("error ", error)

  if (!response.success && response.error !== "" && response.type === ErrorType.GLOBAL) {
    apiErroreEventBus.publish(response)
  }
  return response
}
