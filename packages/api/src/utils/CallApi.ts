import axios, { AxiosRequestConfig } from "axios"
import { ApiConfig, ErrorType } from "./Interfaces"
import { handleResponse } from "./HandleResponse"
import apiErroreEventBus from "./GlobalHttpErrorEventBus"

export default async function callApi(config: ApiConfig): Promise<[any, any]> {
  const requestConfig: AxiosRequestConfig = <AxiosRequestConfig>config
  requestConfig.withCredentials = true
  apiErroreEventBus.publish(null)

  const [response, error] = await handleResponse(axios.request(requestConfig))
  // console.log("requestConfig", requestConfig)
  // console.log("response ", response)
  // console.log("error ", error)

  if (error && error.type === ErrorType.GLOBAL) {
    apiErroreEventBus.publish(error)
    return [undefined, undefined]
  }
  return [response, error]
}
