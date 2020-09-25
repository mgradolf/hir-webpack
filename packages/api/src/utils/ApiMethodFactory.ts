import callApi from "./CallApi"
import { getToken } from "./TokenStore"
import { ApiConfig, IApiResponse } from "./Interfaces"

function callServiceApi(
  endPoint: string,
  Service: string,
  Action: string,
  Params: any,
  Module?: any
): Promise<IApiResponse> {
  const config: ApiConfig = {
    baseURL: process.env.REACT_APP_API_ROOT,
    url: endPoint,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    data: {
      Module,
      Service,
      Action,
      Params
    }
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
