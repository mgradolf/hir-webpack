import { getToken } from "./TokenStore"
import { ApiConfig, IApiResponse, RESPONSE_TYPE } from "./Interfaces"
import { preview } from "./DownloadData"
import axios, { AxiosRequestConfig } from "axios"
import { handleResponse } from "./HandleResponse"
import apiErroreEventBus from "./GlobalHttpErrorEventBus"

type Dictionary = { [key: string]: any }

export interface Iconfig {
  EndPoint: string
  Service: string
  Module: string
  Actions: Dictionary
}

export interface ApiMethod {
  [key: string]: (Params: Dictionary, Headers?: Dictionary) => Promise<IApiResponse>
}

export const baseURL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_ROOT
    : `${window.location.protocol}//${window.location.hostname}:${window.location.port}/`

async function callServiceApi(
  endPoint: string,
  Service: string,
  Action: string,
  Params: any,
  Module?: any,
  Headers?: any
): Promise<IApiResponse> {
  const config: ApiConfig = {
    baseURL,
    url: endPoint,
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      ...Headers
    },
    data: {
      Module,
      Service,
      Action,
      Params
    }
  }

  if (Params && Params.Headers) {
    config.data.Headers = Params.Headers
    delete Params.Headers
  }

  if (Params && (Params[RESPONSE_TYPE.PDF] || (Array.isArray(Params) && Params[0] && Params[0][RESPONSE_TYPE.PDF]))) {
    return preview(config)
  }

  const requestConfig: AxiosRequestConfig = <AxiosRequestConfig>config
  requestConfig.withCredentials = true
  requestConfig.responseType =
    !!Headers &&
    !!Headers.ResponseType &&
    !!(Headers.ResponseType === "application/vnd.ms-excel" || Headers.ResponseType === "text/csv")
      ? "blob"
      : "json"

  const response: IApiResponse = await handleResponse(axios.request(requestConfig))
  if (!response.success && response.error) {
    apiErroreEventBus.publish(response.error)
  }
  return response
}

export default (config: Iconfig) => {
  const Actions: ApiMethod = {}
  Object.keys(config.Actions).forEach((Action) => {
    Actions[Action] = (
      Params: { [key: string]: any | Array<any> },
      Headers?: { [key: string]: any }
    ): Promise<IApiResponse> => callServiceApi(config.EndPoint, config.Service, Action, Params, config.Module, Headers)
  })
  return Actions
}
