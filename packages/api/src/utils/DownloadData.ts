import axios, { AxiosRequestConfig } from "axios"
import { ApiConfig, IApiResponse, RESPONSE_TYPE } from "./Interfaces"
import { handleResponse } from "./HandleResponse"
import apiErroreEventBus from "./GlobalHttpErrorEventBus"
import { saveAs } from "file-saver"

const getNewConfigWithResponseType = (config: ApiConfig): { newConfig: ApiConfig; fileExtension: string } => {
  let header: { [key: string]: any }
  let fileExtension = ""
  const Params = config.data.Params

  if (Params[RESPONSE_TYPE.EXCEL] || (Array.isArray(Params) && Params[0] && Params[0][RESPONSE_TYPE.EXCEL])) {
    if (Params[RESPONSE_TYPE.EXCEL]) delete Params[RESPONSE_TYPE.EXCEL]
    else if (Array.isArray(Params) && Params[0] && Params[0][RESPONSE_TYPE.EXCEL]) delete Params[0][RESPONSE_TYPE.EXCEL]
    header = {
      ["ResponseType"]: "application/vnd.ms-excel"
    }
    fileExtension = ".excel"
  } else if (Params[RESPONSE_TYPE.CSV] || (Array.isArray(Params) && Params[0] && Params[0][RESPONSE_TYPE.CSV])) {
    if (Params[RESPONSE_TYPE.CSV]) delete Params[RESPONSE_TYPE.CSV]
    else if (Array.isArray(Params) && Params[0] && Params[0][RESPONSE_TYPE.CSV]) delete Params[0][RESPONSE_TYPE.CSV]
    header = {
      ["ResponseType"]: "text/csv"
    }
    fileExtension = ".csv"
  } else header = {}

  return {
    newConfig: {
      ...config,
      headers: {
        ...config.headers,
        ...header
      }
    },
    fileExtension
  }
}

export default async function download(config: ApiConfig): Promise<IApiResponse> {
  const { newConfig, fileExtension } = getNewConfigWithResponseType(config)

  const requestConfig: AxiosRequestConfig = <AxiosRequestConfig>newConfig
  requestConfig.withCredentials = true
  const response: IApiResponse = await handleResponse(axios.request(requestConfig))
  if (!response.success && response.error) {
    apiErroreEventBus.publish(response.error)
  }

  if (response.success && response.data) {
    saveAs(response.data, "download" + fileExtension)
  }
  return response
}
