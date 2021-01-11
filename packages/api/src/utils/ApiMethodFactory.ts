import callApi from "./CallApi"
import { getToken } from "./TokenStore"
import { ApiConfig, IApiResponse, RESPONSE_TYPE } from "./Interfaces"
import { download, preview } from "./DownloadData"

export const baseURL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_ROOT
    : `${window.location.protocol}//${window.location.hostname}:${window.location.port}/`

function callServiceApi(
  endPoint: string,
  Service: string,
  Action: string,
  Params: any,
  Module?: any
): Promise<IApiResponse> {
  const config: ApiConfig = {
    baseURL,
    url: endPoint,
    method: "POST",
    headers: {
      // "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    data: {
      Module,
      Service,
      Action,
      Params
    }
  }

  if (
    Params[RESPONSE_TYPE.EXCEL] ||
    (Array.isArray(Params) && Params[0] && Params[0][RESPONSE_TYPE.EXCEL]) ||
    Params[RESPONSE_TYPE.CSV] ||
    (Array.isArray(Params) && Params[0] && Params[0][RESPONSE_TYPE.CSV])
  ) {
    return download(config)
  } else if (Params[RESPONSE_TYPE.PDF] || (Array.isArray(Params) && Params[0] && Params[0][RESPONSE_TYPE.PDF])) {
    return preview(config)
  }

  return callApi(config)
}

type Dictionary = { [key: string]: any }

export interface Iconfig {
  EndPoint: string
  Service: string
  Module: string
  Actions: Dictionary
}

export interface ApiMethod {
  [key: string]: (Params: Dictionary) => Promise<IApiResponse>
}

export default (config: Iconfig) => {
  const Actions: ApiMethod = {}
  Object.keys(config.Actions).forEach((Action) => {
    Actions[Action] = (Params: { [key: string]: any | Array<any> }): Promise<IApiResponse> =>
      callServiceApi(config.EndPoint, config.Service, Action, Params, config.Module)
  })
  return Actions
}
