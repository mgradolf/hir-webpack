import axios, { AxiosRequestConfig } from "axios"
import { ApiConfig, IApiResponse } from "./Interfaces"
import { handleResponse } from "./HandleResponse"
import apiErroreEventBus from "./GlobalHttpErrorEventBus"

export default async function callApi(config: ApiConfig): Promise<IApiResponse> {
  const requestConfig: AxiosRequestConfig = <AxiosRequestConfig>config
  requestConfig.withCredentials = true

  const response: IApiResponse = await handleResponse(axios.request(requestConfig))
  if (!response.success && response.error) {
    apiErroreEventBus.publish(response.error)
  }
  return response
}
