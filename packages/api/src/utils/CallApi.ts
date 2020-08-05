import axios, { AxiosRequestConfig } from "axios"
import { ApiConfig, ErrorType } from "./Interfaces"
import { handleResponse } from "./HandleResponse"
import eventBus from "./GlobalHttpErrorEventBus"

export default async function callApi(config: ApiConfig): Promise<[any, any]> {
  const requestConfig: AxiosRequestConfig = <AxiosRequestConfig>config
  const [response, error] = await handleResponse(axios.request(requestConfig))
  console.log("requestConfig", requestConfig)
  console.log("response ", response)
  console.log("error ", error)

  if (error.type === ErrorType.GLOBAL) {
    eventBus.publish(error)
    return [undefined, undefined]
  }
  return [response, error]
}
