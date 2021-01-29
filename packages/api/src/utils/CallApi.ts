import axios, { AxiosRequestConfig } from "axios"
import { ApiConfig, IApiResponse, RESPONSE_TYPE } from "./Interfaces"
import { handleResponse } from "./HandleResponse"
import apiErroreEventBus from "./GlobalHttpErrorEventBus"
import { saveAs } from "file-saver"

const checkForDownloadHeader = (config: ApiConfig): { fileExtension: string; requestConfig: AxiosRequestConfig } => {
  let fileExtension = ""
  const requestConfig: AxiosRequestConfig = <AxiosRequestConfig>config

  switch (config.headers?.ResponseType) {
    case "application/vnd.ms-excel":
      fileExtension = ".xls"
      requestConfig.responseType = "blob"
      break
    case "text/csv":
      fileExtension = ".csv"
      requestConfig.responseType = "blob"
      break
  }
  return { fileExtension, requestConfig }
}

export default async function callApi(config: ApiConfig): Promise<IApiResponse> {
  const { fileExtension, requestConfig } = checkForDownloadHeader(config)
  requestConfig.withCredentials = true

  if (fileExtension !== "") {
    const response = (await axios.request(requestConfig)).data
    if (response) {
      saveAs(response, `report-${new Date().toISOString()}${fileExtension}`)
    }
    return { data: response, success: true, code: 200, error: null }
  }

  const response: IApiResponse = await handleResponse(axios.request(requestConfig))
  if (!response.success && response.error) {
    apiErroreEventBus.publish(response.error)
  }
  return response
}
